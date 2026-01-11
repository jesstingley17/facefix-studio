# Quick Fix: Image Generation Not Working

If you uploaded a photo and it shows the same photo back, try these steps:

## Step 1: Check Browser Console

1. **Open Developer Tools** (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Try generating an image again
4. **Share any errors you see** - this will tell us what's wrong

## Step 2: Are You Running Locally or in Production?

### If Running Locally (localhost):

**The `/api/generate` endpoint won't work unless you run Cloudflare Functions locally.**

Run this command in your terminal:

```bash
npx wrangler pages dev dist --local
```

Then access your app at `http://localhost:8788` (not the Vite dev server port)

### If Running in Production (Cloudflare Pages):

**Check:**
1. Is `REPLICATE_API_TOKEN` set in Cloudflare Pages environment variables?
2. Is `CUSTOM_MODEL=jesstingley17/facefix-studio` set? (optional but recommended)
3. Check Cloudflare Pages Functions logs for errors

## Step 3: Test API Endpoint

Open your browser console and run this:

```javascript
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
    prompt: 'test transformation'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

**What do you see?**
- `404` = API endpoint not found (need to run wrangler pages dev)
- `500` = Server error (check REPLICATE_API_TOKEN)
- `200` with `id` = API is working!

## Most Likely Issue

**If running locally:** The `/api/generate` endpoint doesn't exist in the Vite dev server. You need to either:
1. Run `npx wrangler pages dev dist --local` for local Functions
2. OR deploy to Cloudflare Pages to test

**Check the browser console and share what errors you see!** 🔍

