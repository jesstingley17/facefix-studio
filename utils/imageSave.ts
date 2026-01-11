/**
 * Save image to device - supports mobile photo gallery via Web Share API
 * Falls back to download on desktop or if Web Share is not available
 */

export async function saveImageToGallery(imageUrl: string, filename: string = 'enhanced-photo.png'): Promise<void> {
  // Check if Web Share API is available (mobile devices)
  if (navigator.share && navigator.canShare) {
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], filename, { type: blob.type });

      // Check if we can share files
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Enhanced Photo',
          text: 'Save this enhanced photo to your gallery',
        });
        console.log('✅ Image shared successfully (should save to gallery on mobile)');
        return;
      }
    } catch (error: any) {
      // If share fails or user cancels, fall back to download
      if (error.name !== 'AbortError') {
        console.warn('Web Share failed, falling back to download:', error);
      } else {
        // User cancelled - don't proceed with download
        return;
      }
    }
  }

  // Fallback: Download the image (works on desktop and as fallback on mobile)
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    console.log('✅ Image downloaded successfully');
  } catch (error) {
    console.error('Failed to save/download image:', error);
    throw new Error('Failed to save image. Please try right-clicking and saving manually.');
  }
}

