# Gemini-Only Mode

The app now uses **Gemini exclusively** for image generation, removing the Replicate fallback.

## Why Gemini Only?

✅ **Better identity preservation** - No deformation issues like Stable Diffusion
✅ **Higher quality results** - More realistic, natural-looking images
✅ **Faster generation** - Synchronous API, no polling needed
✅ **Better face preservation** - Designed for image-to-image with identity preservation

## Trade-offs

⚠️ **Content restrictions** - Gemini may block some adult content despite `BLOCK_NONE` settings
⚠️ **Model-level blocks** - Some content may still be blocked at the model level (not API settings)

## Current Setup

- **Primary**: Gemini 2.5 Flash Image (`gemini-2.5-flash-image`)
- **Fallback**: None (Gemini only)
- **Safety settings**: `BLOCK_NONE` for all categories
- **No Replicate fallback**: Removed to prioritize quality over permissiveness

## If Gemini Blocks Content

If Gemini blocks content with `PROHIBITED_CONTENT` or `SAFETY` errors:

1. **Try different wording** - Adjust the prompt to be less explicit
2. **Accept limitation** - Some content may not be possible with Gemini
3. **Check error message** - Look for specific blocking reasons

## Benefits of Gemini-Only

- ✅ **No deformation** - Better face preservation
- ✅ **Natural results** - More realistic transformations
- ✅ **Faster** - No polling, immediate results
- ✅ **Better quality** - Designed for identity-preserving transformations

## Configuration

The app now uses `services/imageEdit.ts` which directly calls Gemini without any fallback to Replicate.

