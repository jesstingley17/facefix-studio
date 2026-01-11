# Prediction Timeout Troubleshooting

If predictions are timing out after 4 minutes, check these:

## 1. Check Prediction Status on Replicate

1. Go to: https://replicate.com/account
2. Click on "Predictions" or "API" section
3. Find your recent prediction
4. Check the status and logs

**What to look for:**
- Status: Should be "succeeded", "failed", or "processing"
- Logs: Should show model loading and inference steps
- Error messages: If failed, what's the error?

## 2. Test Model Directly

Try running your model directly on Replicate:

1. Go to: https://replicate.com/jesstingley17/facefix-studio
2. Click "Run model" or "API"
3. Upload a test image
4. Enter a simple prompt
5. See if it works there

**If it works on Replicate but not via API:**
- Check API token permissions
- Check request format
- Check prediction polling logic

**If it doesn't work on Replicate:**
- Model might not be deployed correctly
- Model might have an error
- Check model logs

## 3. Check Model Deployment

Verify your model is actually deployed:

```bash
# Check model status
curl https://api.replicate.com/v1/models/jesstingley17/facefix-studio \
  -H "Authorization: Token YOUR_TOKEN"
```

**Check:**
- Does the model exist?
- Does it have versions?
- Is the latest version valid?

## 4. Common Issues

### Model Not Starting

**Symptoms:** Prediction stays in "starting" status
**Cause:** Model might not be loading correctly
**Fix:** Check model logs, verify model files are correct

### Model Taking Too Long

**Symptoms:** Prediction stays in "processing" for >4 minutes
**Cause:** Model might be very slow, or stuck
**Fix:** 
- Check if model is actually running (GPU available?)
- Try simpler prompts
- Reduce `num_inference_steps` (default is 20)
- Reduce image resolution

### API Token Issues

**Symptoms:** Predictions fail immediately
**Fix:** Verify REPLICATE_API_TOKEN is set correctly

### Model Version Issues

**Symptoms:** Predictions fail with "version not found"
**Fix:** Check if model version hash is correct

## 5. Debug Steps

### Step 1: Check Browser Console

Look for these logs:
- `Prediction created: id=...`
- `Poll 10/120: status=...`
- Any error messages

### Step 2: Check Network Tab

1. Open Developer Tools → Network
2. Look for `/api/predictions/[id]` requests
3. Check the response:
   - What's the status?
   - What's the response body?
   - Is it stuck at "processing"?

### Step 3: Test with Simple Prompt

Try a very simple transformation:
- Prompt: "add sunglasses"
- Simple image (small, clear face)
- See if it completes faster

### Step 4: Check Replicate Dashboard

1. Go to https://replicate.com/account
2. Find your prediction
3. Check:
   - Status
   - Logs
   - Error messages
   - Duration

## 6. Quick Test

Run this in your browser console to test:

```javascript
// Test creating a prediction
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    prompt: 'add sunglasses'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Prediction created:', data);
  if (data.id) {
    // Poll manually
    const poll = () => {
      fetch(`/api/predictions/${data.id}`)
        .then(r => r.json())
        .then(result => {
          console.log('Status:', result.status, result);
          if (result.status === 'processing' || result.status === 'starting') {
            setTimeout(poll, 2000);
          }
        });
    };
    setTimeout(poll, 2000);
  }
})
.catch(console.error);
```

## 7. Reduce Inference Time

If model is just too slow, try reducing:

1. **num_inference_steps**: From 20 to 10-15 (faster but lower quality)
2. **Image resolution**: Make sure images aren't too large
3. **Prompt complexity**: Simpler prompts process faster

## 8. Model-Specific Issues

### Custom Model (`jesstingley17/facefix-studio`)

If using custom model:
- Check if model was deployed correctly
- Verify model is running (first request takes longer)
- Check model logs for errors
- Try running it directly on Replicate website

### Fallback Model (instruct-pix2pix)

If fallback is timing out:
- Check if model is available
- Try a different image/prompt
- Check Replicate status

## Next Steps

1. **Check Replicate dashboard** - See actual prediction status
2. **Test model directly** - Run on Replicate website
3. **Check logs** - Browser console and Replicate logs
4. **Try simpler inputs** - Smaller image, simpler prompt
5. **Verify model deployment** - Make sure model is actually deployed

