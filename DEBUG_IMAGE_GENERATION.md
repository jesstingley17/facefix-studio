# Debugging Image Generation Issues

If images aren't generating or you're seeing the same photo back, use this guide to debug.

## Common Issues

### 1. Local Development - API Endpoint Not Working

**Problem:** The app is trying to call `/api/generate` but it's not available locally.

**Solution:** You need to run the Cloudflare Pages Functions locally:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Run local development server with Functions
npx wrangler pages dev dist --local
```

Then access your app at `http://localhost:8788`

### 2. Check Browser Console

1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to the **Console** tab
3. Try generating an image
4. Look for errors or log messages

**What to look for:**
- `API request failed: 404` - API endpoint not found
- `Replicate API error: ...` - Issue with Replicate
- `Failed to fetch generated image: ...` - Image download failed
- `Prediction failed: ...` - Replicate prediction failed

### 3. Check Network Tab

1. Open Developer Tools → **Network** tab
2. Try generating an image
3. Look for the `/api/generate` request

**Check:**
- Status code (should be 200)
- Response body (should have `id` and `status` or `output`)
- Request payload (should have `image` and `prompt`)

### 4. Environment Variables

Make sure these are set:

**For Local Development:**
- Create `.env.local` file
- Add: `REPLICATE_API_TOKEN=your_token_here`

**For Cloudflare Pages:**
- Settings → Environment Variables
- `REPLICATE_API_TOKEN` - Your Replicate API token
- `CUSTOM_MODEL` - `jesstingley17/facefix-studio` (optional)

### 5. Test the API Directly

**Test Replicate API:**

```bash
curl -X POST https://api.replicate.com/v1/predictions \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "VERSION_HASH",
    "input": {
      "image": "data:image/png;base64,iVBORw0KG...",
      "prompt": "transform into a fantasy character",
      "strength": 0.75
    }
  }'
```

Replace `VERSION_HASH` with your model's version ID.

### 6. Check Model Status

1. Go to: https://replicate.com/jesstingley17/facefix-studio
2. Check if the model is public/accessible
3. Check if there are any errors in the model logs

### 7. Common Error Messages

**"API request failed: 404"**
- The `/api/generate` endpoint isn't available
- Solution: Run `npx wrangler pages dev dist --local` for local dev

**"Replicate API token not configured"**
- Missing `REPLICATE_API_TOKEN` environment variable
- Solution: Add it to `.env.local` (local) or Cloudflare Pages (production)

**"Prediction failed: ..."**
- The model failed to generate
- Check the error message for details
- Try a different prompt or image

**"Prediction timed out"**
- The model took too long (>2 minutes)
- Solution: Increase `maxAttempts` in `pollReplicatePrediction` or check model status

**"No image URL in output"**
- The prediction succeeded but no image was returned
- Check Replicate dashboard for the prediction logs

### 8. Debug Mode

Add this to your browser console to see detailed logs:

```javascript
// Enable verbose logging
localStorage.setItem('debug', 'true');
```

Then refresh the page and try generating again.

### 9. Test with a Simple Image

Try with a very simple prompt first:
- Upload a simple photo (clear face, good lighting)
- Use prompt: "transform into a cartoon character"
- Check if it works, then try more complex prompts

### 10. Check Model Parameters

The model uses these parameters:
- `strength: 0.75` - How much to transform (0.0-1.0)
- `guidance_scale: 7.5` - How closely to follow prompt
- `num_inference_steps: 20` - Quality vs speed

If you're seeing minimal changes:
- Try increasing `strength` to `0.85` or `0.9`
- Try increasing `guidance_scale` to `10` or `12`

## Quick Fix Checklist

- [ ] Running locally? Use `npx wrangler pages dev dist --local`
- [ ] Check browser console for errors
- [ ] Verify `REPLICATE_API_TOKEN` is set
- [ ] Test with a simple prompt first
- [ ] Check Network tab for API responses
- [ ] Verify model is accessible on Replicate
- [ ] Try increasing `strength` parameter

## Still Not Working?

1. Share the browser console errors
2. Share the Network tab response from `/api/generate`
3. Check Cloudflare Pages Functions logs (if deployed)
4. Check Replicate dashboard for prediction status

