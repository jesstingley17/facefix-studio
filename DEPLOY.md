# Deploying to Cloudflare Pages

This guide will help you deploy FaceFix Studio to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. Your Gemini API key (from Google AI Studio)

## Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**
   - Navigate to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**

2. **Connect your GitHub repository**
   - Select your GitHub account
   - Choose the `facefix-studio` repository
   - Click **Begin setup**

3. **Configure Build Settings** (IMPORTANT!)
   - **Project name**: `facefix-studio` (or your preferred name)
   - **Production branch**: `main`
   - **Build command**: `npm run build` (NOT `npx vitepress build` - make sure to override auto-detection)
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave as default)
   - ⚠️ **Note**: Cloudflare may auto-detect this as VitePress. Make sure to manually set the build command to `npm run build`

4. **Set Environment Variables**
   Click **Add variable** and add:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key from Google AI Studio
   - Make sure to add it to both **Production** and **Preview** environments

5. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will build and deploy your site
   - Your site will be available at `https://facefix-studio.pages.dev` (or your custom domain)

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler** (if not already installed)
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=facefix-studio
   ```

4. **Set Environment Variables via Dashboard**
   - Go to your Pages project in Cloudflare Dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add `GEMINI_API_KEY` with your API key

## Environment Variables

Required environment variable:
- `GEMINI_API_KEY`: Your Google Gemini API key

**Important**: Make sure to set this in both Production and Preview environments in Cloudflare Pages settings.

## Custom Domain (Optional)

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Follow the instructions to add your domain

## Troubleshooting

### Build Error: "vitepress build" or "Found dead link"
**Problem**: Cloudflare is using `npx vitepress build` instead of `npm run build`

**Solution**: 
1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Settings** → **Builds & deployments**
3. Click **Edit build settings**
4. Change **Build command** from `npx vitepress build` to `npm run build`
5. Save and trigger a new deployment

### Other Issues
- **Build fails**: Check that all dependencies are in `package.json`
- **API key not working**: Verify the environment variable is set in Cloudflare Dashboard
- **404 errors on routes**: The `_redirects` file should handle SPA routing automatically
- **Old commit being built**: Make sure Cloudflare is set to use the `main` branch and trigger a new build

## Notes

- The `_redirects` file in the `public` folder ensures proper SPA routing
- Environment variables are available during build time
- Your site is automatically rebuilt on every push to the main branch

