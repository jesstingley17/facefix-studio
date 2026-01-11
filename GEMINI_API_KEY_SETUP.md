# Gemini API Key Setup

The app now uses Gemini exclusively for image generation. You need to configure your Gemini API key.

## Error You're Seeing

If you see this error:
```
API key not valid. Please pass a valid API key.
```

It means the Gemini API key is not configured or invalid.

## Quick Fix

### Step 1: Get Your Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (starts with `AIza...`)

### Step 2: Set Environment Variable

**For Local Development:**

Create or update `.env.local` in the project root:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**For Cloudflare Pages:**

1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Your API key (the one starting with `AIza...`)
5. Save and redeploy

### Step 3: Restart Local Server

If running locally, restart your dev server after adding the key:
```bash
npm run dev
```

## Verification

After setting the key, try generating an image. If the key is valid, you should see:
- `🎨 Generating image with Gemini (better identity preservation)...`
- `✅ Gemini generation successful`

If you still see errors, check:
1. The API key is correct (no extra spaces)
2. The environment variable name matches exactly: `GEMINI_API_KEY`
3. You've restarted the dev server (local) or redeployed (Cloudflare)

## Important Notes

- The Gemini API key starts with `AIza...` (Google API key format)
- Keep your API key secret - never commit it to git
- The `.env.local` file is already in `.gitignore` (safe to use)
- Cloudflare Pages environment variables are encrypted and secure

