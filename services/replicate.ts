/**
 * Edit photo with Replicate API - supports image-to-image generation
 * Uses Stable Diffusion models that allow adult content
 * Face mapping disabled - direct image transformation
 * 
 * Note: API calls are proxied through Cloudflare Functions to keep API token secure
 */
export const editPhoto = async (
  base64Image: string, 
  userPrompt: string
): Promise<string> => {
  // Require a prompt - no automatic generation without user input
  if (!userPrompt || !userPrompt.trim()) {
    throw new Error("Prompt is required for image generation.");
  }

  try {
    // Convert base64 to format we can send
    let imageDataUrl = base64Image;
    if (!base64Image.startsWith('data:')) {
      const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
      imageDataUrl = `data:image/png;base64,${base64Data}`;
    }

    // Call our Cloudflare Function API endpoint
    // In production, this will be /api/generate (Cloudflare Functions)
    // For local dev, you'll need to set up a local proxy or use the Replicate API directly
    const apiUrl = import.meta.env.PROD 
      ? '/api/generate'  // Production: Cloudflare Function
      : 'http://localhost:8788/api/generate';  // Local dev: if running wrangler pages dev

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageDataUrl,
        prompt: userPrompt,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API request failed: ${response.status}`);
    }

    const result = await response.json();

    // If we got a prediction ID, poll for completion
    if (result.id && (result.status === 'starting' || result.status === 'processing')) {
      const imageUrl = await pollReplicatePrediction(result.id);
      
      // Fetch and convert to base64 data URL
      if (imageUrl.startsWith('http')) {
        const imgResponse = await fetch(imageUrl);
        const blob = await imgResponse.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return `data:image/png;base64,${base64}`;
      }
      
      return imageUrl;
    }

    // If we already have output URLs
    if (result.output) {
      const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
      
      if (imageUrl.startsWith('http')) {
        const imgResponse = await fetch(imageUrl);
        const blob = await imgResponse.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return `data:image/png;base64,${base64}`;
      }
      
      return imageUrl.startsWith('data:') ? imageUrl : `data:image/png;base64,${imageUrl}`;
    }

    throw new Error("Unexpected response format from API");
  } catch (error: any) {
    console.error("Replicate Image Editing Error:", error);
    throw new Error(error.message || "An unexpected error occurred during image generation.");
  }
};

/**
 * Poll Replicate API for prediction completion
 */
async function pollReplicatePrediction(predictionId: string, maxAttempts = 60): Promise<string> {
  const apiUrl = import.meta.env.PROD 
    ? `/api/predictions/${predictionId}`
    : `http://localhost:8788/api/predictions/${predictionId}`;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Failed to fetch prediction: ${response.status}`);
      
      const result = await response.json();
      
      if (result.status === 'succeeded' && result.output) {
        return Array.isArray(result.output) ? result.output[0] : result.output;
      }
      
      if (result.status === 'failed' || result.status === 'canceled') {
        throw new Error(`Prediction ${result.status}: ${result.error || 'Unknown error'}`);
      }
      
      // Still processing, continue polling
    } catch (error: any) {
      if (i === maxAttempts - 1) throw error;
      // Continue polling on transient errors
    }
  }

  throw new Error("Prediction timed out after 60 seconds");
}

