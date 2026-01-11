# Gemini Setup for Hybrid Approach

Your app now tries Gemini first, then falls back to Replicate. However, **Gemini needs to be configured** for this to work.

## Current Status

The Gemini service (`services/gemini.ts`) uses `process.env.API_KEY`, which won't work in the browser. Gemini needs to either:

1. **Use Cloudflare Functions** (recommended - secure, keeps API key server-side)
2. **Use import.meta.env** (less secure - exposes API key to client)

## Option 1: Cloudflare Function for Gemini (Recommended)

Create a Cloudflare Function similar to the Replicate one:

**`functions/api/gemini-generate.ts`:**
```typescript
export const onRequestPost: PagesFunction = async (context) => {
  const { request, env } = context;
  // ... Gemini API call using env.GEMINI_API_KEY
};
```

Then update `services/gemini.ts` to call this function instead of the API directly.

## Option 2: Client-Side (Less Secure)

Update `services/gemini.ts` to use `import.meta.env`:

```typescript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
```

And set the environment variable in Cloudflare Pages.

## Current Behavior

**Without Gemini configured:**
- Gemini will fail immediately
- Falls back to Replicate automatically ✅
- Everything still works, just uses Replicate only

**With Gemini configured:**
- Tries Gemini first (fast)
- Falls back to Replicate if Gemini blocks/fails
- Best of both worlds!

## Quick Setup

To enable Gemini, you need:

1. **Google Gemini API Key** from https://makersuite.google.com/app/apikey
2. **Cloudflare Function** for Gemini (or update gemini.ts to use import.meta.env)
3. **Environment variable** `GEMINI_API_KEY` in Cloudflare Pages

## Recommendation

For now, **the hybrid approach will work** - it will just always fallback to Replicate since Gemini isn't configured. This is fine!

To enable Gemini:
- Create a Cloudflare Function for Gemini (like the Replicate one)
- OR update gemini.ts to use import.meta.env (simpler, but less secure)

