<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `REPLICATE_API_TOKEN` environment variable:
   - Get your API token from [Replicate](https://replicate.com/account/api-tokens)
   - Create a `.env.local` file in the root directory
   - Add: `REPLICATE_API_TOKEN=your_api_token_here`
   - Note: This file is gitignored and won't be committed

3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Cloudflare Pages

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

Quick steps:
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables:
   - `REPLICATE_API_TOKEN` (your Replicate API token)
   - `CUSTOM_MODEL=jesstingley17/facefix-studio` (optional - uses your custom model)
5. Deploy!

## Custom Model

✅ **Your custom Stable Diffusion model is deployed!**

- **Model URL**: https://replicate.com/jesstingley17/facefix-studio
- **Status**: Ready to use

See [MODEL_DEPLOYED.md](MODEL_DEPLOYED.md) for configuration instructions.
