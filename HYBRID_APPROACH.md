# Gemini + Replicate Hybrid Approach

Your app now uses a hybrid approach: **Gemini first, Replicate as fallback**.

## How It Works

### Flow:
1. **Try Gemini first** → Fast, synchronous, good quality
2. **If Gemini fails** → Automatically fallback to Replicate
3. **If Replicate fails** → Show error with both messages

### Benefits:

#### Gemini (Primary)
- ✅ **Fast** - No polling, synchronous response
- ✅ **Good quality** - High-quality image generation
- ✅ **Simple** - Direct API call
- ⚠️ **Content restrictions** - May block certain content

#### Replicate (Fallback)
- ✅ **No restrictions** - Allows all content types
- ✅ **More permissive** - Won't block adult/artistic content
- ✅ **Stable** - Reliable img2img model
- ⚠️ **Slower** - Requires polling (2+ minutes)

## When Fallback Happens

Replicate is used as fallback when:
- Gemini blocks content (PROHIBITED_CONTENT, SAFETY, RECITATION)
- Gemini API errors (network, rate limits, etc.)
- Gemini returns no image data
- Any other Gemini failure

## Configuration

### Required Environment Variables:

**For Gemini (Cloudflare Pages):**
- `GEMINI_API_KEY` - Your Google Gemini API key

**For Replicate (Cloudflare Pages):**
- `REPLICATE_API_TOKEN` - Your Replicate API token
- `CUSTOM_MODEL` (optional) - Default: `stability-ai/stable-diffusion-img2img`

### Local Development:

**For Gemini:**
- Create `.env.local` file
- Add: `VITE_GEMINI_API_KEY=your_key_here`

**For Replicate:**
- Add: `VITE_REPLICATE_API_TOKEN=your_token_here`

## Usage

The unified service is transparent - your app code doesn't need to change:

```typescript
import { editPhoto } from './services/imageEdit';

// This will try Gemini first, then Replicate if needed
const result = await editPhoto(image, prompt);
```

## Logs

You'll see in the browser console:
- `🎨 Attempting image generation with Gemini...`
- `✅ Gemini generation successful` (if Gemini works)
- `⚠️ Gemini generation failed, falling back to Replicate...` (if fallback)
- `✅ Replicate fallback successful` (if Replicate works)
- `❌ Both Gemini and Replicate failed` (if both fail)

## Best Practices

1. **Gemini API Key** - Make sure it's set in Cloudflare Pages
2. **Replicate Token** - Always have this as backup
3. **Monitor logs** - Check which service is being used
4. **Content types** - Gemini will handle most, Replicate handles restrictive content

## Expected Behavior

- **Normal content** → Gemini (fast, ~5-10 seconds)
- **Restricted content** → Replicate (slower, ~60-120 seconds)
- **API errors** → Replicate fallback
- **Both fail** → Error message

## Advantages

1. **Speed** - Gemini is fast for most requests
2. **Reliability** - Replicate backup ensures requests don't fail
3. **Flexibility** - Works for all content types
4. **Cost** - Gemini is free (generous limits), Replicate is paid but only used when needed

## Troubleshooting

### "Both Gemini and Replicate failed"
- Check that both API keys are set
- Check Cloudflare Pages environment variables
- Check browser console for specific errors

### "Gemini generation failed, falling back to Replicate"
- This is normal for restricted content
- Replicate will handle it
- Check logs to see which service succeeded

### Gemini works but Replicate doesn't
- Check REPLICATE_API_TOKEN
- Check network connectivity
- Check Replicate dashboard for errors

