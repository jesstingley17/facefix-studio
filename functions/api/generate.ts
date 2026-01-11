/**
 * Cloudflare Function to proxy Replicate API calls
 * This keeps the API token server-side and secure
 */

export const onRequestPost: PagesFunction = async (context) => {
  const { request, env } = context;
  
  try {
    const { image, prompt } = await request.json();
    
    if (!image || !prompt) {
      return new Response(
        JSON.stringify({ error: "Image and prompt are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const replicateToken = env.REPLICATE_API_TOKEN || env.API_KEY;
    if (!replicateToken) {
      return new Response(
        JSON.stringify({ error: "Replicate API token not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use custom model if specified, otherwise try to get latest version
    // Set your custom model in environment variable: CUSTOM_MODEL=your-username/facefix-studio
    let customModel = env.CUSTOM_MODEL as string | undefined;
    let versionHash: string;
    let useCustomModel = false;
    
    if (customModel) {
      // Use custom model - get latest version
      try {
        const modelResponse = await fetch(`https://api.replicate.com/v1/models/${customModel}`, {
          headers: {
            "Authorization": `Token ${replicateToken}`,
            "Content-Type": "application/json",
          },
        });
        
        if (modelResponse.ok) {
          const modelInfo = await modelResponse.json();
          if (modelInfo.latest_version) {
            versionHash = modelInfo.latest_version.id;
            useCustomModel = true;
          } else {
            throw new Error("Custom model not found or has no versions");
          }
        } else {
          throw new Error(`Failed to fetch custom model: ${modelResponse.status}`);
        }
      } catch (err) {
        console.error("Error fetching custom model, falling back to instruct-pix2pix:", err);
        useCustomModel = false;
      }
    }
    
    if (!useCustomModel) {
      // Fallback: Get the latest version of instruct-pix2pix model
      versionHash = "30a09a59c1f5d38f77c2b80a5eac5f30c40f1b0"; // Fallback version
      
      try {
        const modelResponse = await fetch("https://api.replicate.com/v1/models/timothybrooks/instruct-pix2pix", {
          headers: {
            "Authorization": `Token ${replicateToken}`,
            "Content-Type": "application/json",
          },
        });
        
        if (modelResponse.ok) {
          const modelInfo = await modelResponse.json();
          if (modelInfo.latest_version) {
            versionHash = modelInfo.latest_version.id;
          }
        }
      } catch (err) {
        console.error("Error fetching model version, using fallback:", err);
        // Continue with fallback version
      }
    }

    // Prepare image - Replicate accepts data URLs directly for img2img models
    // Make sure it's properly formatted as a data URL
    let imageInput = image;
    if (imageInput.startsWith('data:')) {
      // Already a data URL, use as-is
    } else if (imageInput.startsWith('http')) {
      // URL, use as-is
    } else {
      // Assume base64, add data URL prefix
      imageInput = `data:image/png;base64,${imageInput}`;
    }
    
    // Input parameters - custom model uses standard SD img2img params
    const inputParams: any = {
      image: imageInput,
      prompt: prompt,
      strength: 0.75,  // How much to transform (0.0-1.0) - higher = more transformation
      guidance_scale: 7.5,
      num_inference_steps: 20,
      negative_prompt: "blurry, low quality, distorted, watermark, text",
    };
    
    // For instruct-pix2pix, use different parameter name
    if (!useCustomModel) {
      inputParams.image_guidance_scale = 1.5;
      delete inputParams.strength; // instruct-pix2pix doesn't use strength
    }
    
    console.log(`Using ${useCustomModel ? 'custom' : 'instruct-pix2pix'} model: ${versionHash.substring(0, 8)}...`);
    console.log(`Input params: prompt="${prompt.substring(0, 50)}...", strength=${inputParams.strength || 'N/A'}, image format=${imageInput.substring(0, 30)}...`);
    
    // Call Replicate API to create prediction
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${replicateToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: versionHash,
        input: inputParams,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Replicate API error (${response.status}):`, errorText);
      return new Response(
        JSON.stringify({ error: `Replicate API error: ${errorText}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    console.log(`Prediction created: id=${result.id}, status=${result.status}`);
    
    // Poll for completion if needed
    if (result.status === "starting" || result.status === "processing") {
      // In a real implementation, you'd poll the URL in result.urls.get
      // For now, return the prediction object
      return new Response(
        JSON.stringify({ 
          id: result.id,
          status: result.status,
          urls: result.urls 
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(result),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

