# Babes XL Model - Fallback Setup

The app now uses **Gemini first, with `asiryan/babes-xl` as fallback**.

## Current Setup

- **Primary**: Gemini 2.5 Flash Image (fast, better identity preservation)
- **Fallback**: `asiryan/babes-xl` via Replicate (more permissive, no content restrictions)

## Model Information

**asiryan/babes-xl:**
- **Model ID**: `asiryan/babes-xl`
- **Version**: `a07fcbe80652ccf989e8198654740d7d562de85f573196dd624a8a80285da27d`
- **Supports**: Text2Img, Img2Img ✅, Inpainting
- **Default Model**: Now set as default Replicate model (replaces stability-ai/stable-diffusion-img2img)

## How It Works

1. **Try Gemini first** → Fast, synchronous, better identity preservation
2. **If Gemini fails/blocks** → Automatically fallback to `babes-xl`
3. **If both fail** → Show error with both messages

## When Fallback Happens

Replicate (`babes-xl`) is used as fallback when:
- Gemini blocks content (PROHIBITED_CONTENT, SAFETY, RECITATION)
- Gemini API errors (network, rate limits, invalid API key, etc.)
- Gemini returns no image data
- Any other Gemini failure

## Configuration

### Required Environment Variables

**For Gemini (Cloudflare Pages):**
- `GEMINI_API_KEY` - Your Google Gemini API key

**For Replicate (Cloudflare Pages):**
- `REPLICATE_API_TOKEN` - Your Replicate API token
- `CUSTOM_MODEL` (optional) - Default: `asiryan/babes-xl`

### Local Development

**For Gemini:**
- `.env.local`: `VITE_GEMINI_API_KEY=your_key_here`

**For Replicate:**
- `.env.local`: `VITE_REPLICATE_API_TOKEN=your_token_here`

## Model Parameters

The `babes-xl` model will use the same optimized parameters from the Replicate function:
- `strength: 0.20` (ultra low - preserves identity)
- `guidance_scale: 7.0` (gentler)
- `num_inference_steps: 50` (quality)
- Enhanced prompt with identity preservation terms
- Comprehensive negative prompt

## Benefits

✅ **Gemini**: Fast, better identity preservation, no deformation
✅ **Babes XL**: More permissive, no content restrictions, reliable fallback
✅ **Best of both worlds**: Quality when possible, permissiveness when needed

## Notes

- The `babes-xl` model parameters may need adjustment based on testing
- Different models may have different optimal parameter ranges
- If you need different parameters for `babes-xl`, they can be adjusted in `functions/api/generate.ts`

