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
    console.log("API response:", result);

    // If we got a prediction ID, poll for completion
    if (result.id && (result.status === 'starting' || result.status === 'processing')) {
      console.log(`Polling for prediction ${result.id}...`);
      const imageUrl = await pollReplicatePrediction(result.id);
      console.log(`Prediction complete, got image URL: ${imageUrl.substring(0, 50)}...`);
      
      // Fetch and convert to base64 data URL
      if (imageUrl && imageUrl.startsWith('http')) {
        const imgResponse = await fetch(imageUrl);
        if (!imgResponse.ok) {
          throw new Error(`Failed to fetch generated image: ${imgResponse.status}`);
        }
        const blob = await imgResponse.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return `data:image/png;base64,${base64}`;
      }
      
      if (imageUrl && imageUrl.startsWith('data:')) {
        return imageUrl;
      }
      
      throw new Error(`Invalid image URL format: ${imageUrl}`);
    }

    // If we already have output URLs
    if (result.output) {
      const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
      
      if (!imageUrl) {
        throw new Error("No image URL in output");
      }
      
      if (imageUrl.startsWith('http')) {
        const imgResponse = await fetch(imageUrl);
        if (!imgResponse.ok) {
          throw new Error(`Failed to fetch generated image: ${imgResponse.status}`);
        }
        const blob = await imgResponse.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return `data:image/png;base64,${base64}`;
      }
      
      return imageUrl.startsWith('data:') ? imageUrl : `data:image/png;base64,${imageUrl}`;
    }

    throw new Error(`Unexpected response format from API: ${JSON.stringify(result)}`);
  } catch (error: any) {
    console.error("Replicate Image Editing Error:", error);
    throw new Error(error.message || "An unexpected error occurred during image generation.");
  }
};

/**
 * Poll Replicate API for prediction completion
 */
async function pollReplicatePrediction(predictionId: string, maxAttempts = 120): Promise<string> {
  const apiUrl = import.meta.env.PROD 
    ? `/api/predictions/${predictionId}`
    : `http://localhost:8788/api/predictions/${predictionId}`;

  const pollInterval = 2000; // 2 seconds
  const maxTime = (maxAttempts * pollInterval) / 1000; // Total time in seconds

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, pollInterval)); // Wait 2 seconds between polls

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch prediction (${response.status}): ${errorText}`);
      }
      
      const result = await response.json();
      
      // Log progress every 10 polls (every 20 seconds)
      if ((i + 1) % 10 === 0 || result.status === 'succeeded' || result.status === 'failed') {
        console.log(`Poll ${i + 1}/${maxAttempts} (${Math.round((i + 1) * pollInterval / 1000)}s): status=${result.status}`);
      }
      
      if (result.status === 'succeeded' && result.output) {
        const output = Array.isArray(result.output) ? result.output[0] : result.output;
        if (!output) {
          throw new Error("Prediction succeeded but no output image URL found");
        }
        console.log(`✅ Prediction completed successfully after ${Math.round((i + 1) * pollInterval / 1000)} seconds`);
        return output;
      }
      
      if (result.status === 'failed' || result.status === 'canceled') {
        const errorMsg = result.error || result.logs?.join('\n') || 'Unknown error';
        console.error(`❌ Prediction ${result.status}:`, errorMsg);
        throw new Error(`Prediction ${result.status}: ${errorMsg}`);
      }
      
      // Still processing, continue polling
      // Show status if there are logs
      if (result.logs && result.logs.length > 0 && (i + 1) % 5 === 0) {
        const lastLog = result.logs[result.logs.length - 1];
        console.log(`Processing... ${lastLog.substring(0, 100)}`);
      }
    } catch (error: any) {
      // If it's the last attempt or a non-retryable error, throw it
      if (i === maxAttempts - 1 || (error.message && error.message.includes('failed'))) {
        throw error;
      }
      // Continue polling on transient errors
      if ((i + 1) % 5 === 0) {
        console.warn(`Poll attempt ${i + 1} error (will retry):`, error.message);
      }
    }
  }

  throw new Error(`Prediction timed out after ${maxTime} seconds (${maxAttempts} attempts). The model may be taking longer than expected or there may be an issue with the prediction.`);
}

