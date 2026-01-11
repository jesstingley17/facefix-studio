
import Replicate from "replicate";

const getReplicateClient = () => {
  const apiKey = process.env.REPLICATE_API_TOKEN || process.env.API_KEY;
  if (!apiKey) throw new Error("Replicate API token not found. Set REPLICATE_API_TOKEN environment variable.");
  return new Replicate({ auth: apiKey });
};

/**
 * Edit photo with Replicate API - supports image-to-image generation
 * Uses Stable Diffusion models that allow adult content
 * Face mapping disabled - direct image transformation
 */
export const editPhoto = async (
  base64Image: string, 
  userPrompt: string
): Promise<string> => {
  const replicate = getReplicateClient();

  // Require a prompt - no automatic generation without user input
  if (!userPrompt || !userPrompt.trim()) {
    throw new Error("Prompt is required for image generation.");
  }

  try {
    // Convert base64 to format Replicate can use
    // Replicate accepts base64 data URLs directly
    let imageDataUrl = base64Image;
    if (!base64Image.startsWith('data:')) {
      const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
      imageDataUrl = `data:image/png;base64,${base64Data}`;
    }

    // Use instruct-pix2pix for image-to-image editing with prompts
    // This model explicitly supports image transformation based on text prompts
    // It allows adult content and works well with uploaded photos
    const output = await replicate.run(
      "timothybrooks/instruct-pix2pix:30a09a59c1f5d38f77c2b80a5eac5f30c40f1b0",
      {
        input: {
          image: imageDataUrl,
          prompt: userPrompt,
          num_outputs: 1,
          image_guidance_scale: 1.5,
          guidance_scale: 7.5,
          num_inference_steps: 20,
        }
      }
    );

    // Replicate returns an array of URLs or base64 data
    let imageUrl = '';
    
    if (Array.isArray(output)) {
      imageUrl = output[0] as string;
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && typeof output === 'object' && 'image' in output) {
      imageUrl = (output as any).image;
    }

    if (!imageUrl) {
      console.error("Replicate output structure:", JSON.stringify(output, null, 2));
      throw new Error("Image generation failed. Replicate did not return an image URL.");
    }

    // If it's a URL, fetch and convert to base64 data URL
    if (imageUrl.startsWith('http')) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:image/png;base64,${base64}`;
      } catch (err) {
        console.error("Error fetching image from Replicate:", err);
        throw new Error("Failed to fetch generated image from Replicate.");
      }
    }

    // If it's already a base64 data URL, return as-is
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }

    // Otherwise, assume it's base64 and wrap it
    return `data:image/png;base64,${imageUrl}`;
  } catch (error: any) {
    console.error("Replicate Image Editing Error:", error);
    
    // Handle Replicate-specific errors
    if (error.message) {
      if (error.message.includes("content policy") || error.message.includes("safety")) {
        throw new Error("Content blocked by Replicate's content policy. Try a different prompt or image.");
      }
      if (error.message.includes("API token")) {
        throw new Error("Invalid Replicate API token. Please check your REPLICATE_API_TOKEN environment variable.");
      }
    }
    
    throw new Error(error.message || "An unexpected error occurred during image generation with Replicate.");
  }
};

