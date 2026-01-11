/**
 * Resize image to max dimensions while maintaining aspect ratio
 * Prevents CUDA out of memory errors by limiting image size
 */
export async function resizeImage(
  imageDataUrl: string,
  maxWidth: number = 1024,
  maxHeight: number = 1024,
  quality: number = 0.92
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      
      if (width <= maxWidth && height <= maxHeight) {
        // Image is already small enough
        console.log(`Image size OK: ${width}x${height}`);
        resolve(imageDataUrl);
        return;
      }
      
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
      
      // Create canvas and resize
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Use high-quality resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert back to data URL (use PNG for quality)
      const resizedDataUrl = canvas.toDataURL('image/png', quality);
      console.log(`Resized image from ${img.width}x${img.height} to ${width}x${height}`);
      resolve(resizedDataUrl);
    };
    img.onerror = () => {
      reject(new Error('Failed to load image for resizing'));
    };
    img.src = imageDataUrl;
  });
}

