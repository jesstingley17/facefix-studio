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

    // Get the latest version of instruct-pix2pix model
    // Replicate API requires a specific version hash, not just model name
    let versionHash = "30a09a59c1f5d38f77c2b80a5eac5f30c40f1b0"; // Fallback version
    
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

    // Call Replicate API to create prediction
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${replicateToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: versionHash,
        input: {
          image: image,
          prompt: prompt,
          num_outputs: 1,
          image_guidance_scale: 1.5,
          guidance_scale: 7.5,
          num_inference_steps: 20,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(
        JSON.stringify({ error: `Replicate API error: ${error}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    
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

