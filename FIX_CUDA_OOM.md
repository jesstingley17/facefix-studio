# Fix CUDA Out of Memory Error

## Problem

The `asiryan/babes-xl` model was running out of GPU memory (CUDA OOM) when processing large images:
- Error: "Tried to allocate 44.50 GiB"
- This happens when images are too large (e.g., 4K+ resolution)

## Solution

**Image resizing before sending to API:**
- Resize all images to max 1024x1024 before sending to Gemini or Replicate
- Maintains aspect ratio
- Prevents CUDA OOM errors
- Improves API performance

## Implementation

### 1. Created `utils/imageResize.ts`
- Utility function to resize images
- Maintains aspect ratio
- Uses high-quality canvas resizing
- Logs resize operations

### 2. Updated `services/replicate.ts`
- Resizes images to 1024x1024 before sending to Replicate
- Prevents CUDA OOM errors with babes-xl model

### 3. Updated `services/gemini.ts`
- Resizes images to 1024x1024 before sending to Gemini
- Helps with API limits and performance

## Benefits

✅ **Prevents CUDA OOM errors** - Images are now within safe size limits
✅ **Faster processing** - Smaller images process faster
✅ **Better reliability** - Less likely to hit memory limits
✅ **Maintains quality** - 1024x1024 is sufficient for most use cases

## Image Size Limits

- **Max dimensions**: 1024x1024 pixels
- **Format**: PNG (maintains quality)
- **Aspect ratio**: Preserved automatically
- **Quality**: High-quality resizing with smoothing

## If Still Getting OOM Errors

If you still get CUDA OOM errors after this fix:

1. **Reduce max size further** (e.g., 768x768):
   ```typescript
   const resizedImage = await resizeImage(base64Image, 768, 768);
   ```

2. **Check image dimensions** - Look at console logs to see actual sizes

3. **Try different model** - Some models are more memory-efficient

4. **Wait and retry** - Could be temporary GPU capacity issue on Replicate

## Testing

After deploying:
- Upload a large image (e.g., 4K photo)
- Check browser console for resize logs
- Image should be automatically resized before sending
- Should no longer get CUDA OOM errors

