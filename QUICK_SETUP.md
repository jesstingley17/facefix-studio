# Quick Setup Checklist

## ✅ Required Environment Variables

You need **TWO** API keys for the app to work (Gemini + Replicate fallback):

### 1. Gemini API Key (Required - Primary)

**Get your key:**
- Go to https://makersuite.google.com/app/apikey
- Sign in with Google
- Click "Create API Key"
- Copy the key (starts with `AIza...`)

**For Local Development:**
Create/update `.env.local`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**For Cloudflare Pages:**
1. Go to Cloudflare Dashboard → Your project
2. Settings → Environment Variables
3. Add: `GEMINI_API_KEY` = `your_gemini_api_key_here`
4. Save and redeploy

### 2. Replicate API Token (Required - Fallback)

**Get your token:**
- Go to https://replicate.com/account/api-tokens
- Copy your token (starts with `r8_...`)

**For Local Development:**
Add to `.env.local`:
```env
VITE_REPLICATE_API_TOKEN=your_replicate_token_here
```

**For Cloudflare Pages:**
1. Go to Cloudflare Dashboard → Your project
2. Settings → Environment Variables
3. Add: `REPLICATE_API_TOKEN` = `your_replicate_token_here`
4. Save and redeploy

## 📋 Complete `.env.local` Example

Create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=AIza...your_key_here
VITE_REPLICATE_API_TOKEN=r8_...your_token_here
```

## 🚀 After Adding Keys

**Local:**
- Restart your dev server: `npm run dev`

**Cloudflare:**
- Add both environment variables in dashboard
- Redeploy (or it will auto-deploy on next push)

## ✅ That's It!

Once both keys are set, the app will:
1. Try Gemini first (fast, better quality)
2. Fallback to `babes-xl` if Gemini fails/blocks
3. Work seamlessly with both services

## ⚠️ Important Notes

- **Both keys are required** - Gemini for primary, Replicate for fallback
- Never commit `.env.local` to git (already in `.gitignore`)
- Gemini key starts with `AIza...`
- Replicate token starts with `r8_...`
- Restart dev server after adding keys locally
- Redeploy on Cloudflare after adding environment variables

