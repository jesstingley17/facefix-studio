# Deploy Instructions for jesstingley17

## Prerequisites

1. **Install Docker Desktop** (if not installed):
   - Mac: Download from https://www.docker.com/products/docker-desktop
   - Start Docker Desktop and wait for it to be running

2. **Create model on Replicate** (do this first):
   - Go to: https://replicate.com/create
   - Model name: `facefix-studio`
   - Visibility: Private (recommended) or Public
   - Click "Create"
   - This creates the model page at: https://replicate.com/jesstingley17/facefix-studio

## Quick Deploy (Automated)

Run this from the project root:

```bash
cd replicate-model
./deploy.sh
```

The script will:
- Install Cog if needed
- Prompt you to login (opens browser)
- Build and push the model (15-30 minutes first time)

## Manual Deploy Steps

If you prefer to do it manually:

### 1. Install Cog

```bash
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog
```

Verify:
```bash
cog --version
```

### 2. Login to Replicate

```bash
cog login
```

This opens a browser window. Sign in with your Replicate account (jesstingley17).

### 3. Navigate to Model Directory

```bash
cd replicate-model
```

### 4. Push the Model

```bash
cog push r8.im/jesstingley17/facefix-studio
```

**First time:** This takes 15-30 minutes as it:
- Downloads Stable Diffusion model (~5GB)
- Builds Docker image
- Uploads to Replicate

**Subsequent pushes:** Much faster (~2-5 minutes).

## After Deployment

Once the model is pushed successfully:

1. **Get your model URL**:
   - It will be: `jesstingley17/facefix-studio`
   - Check it at: https://replicate.com/jesstingley17/facefix-studio

2. **Update Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Your Pages Project
   - Settings → Environment Variables
   - Add new variable:
     - Name: `CUSTOM_MODEL`
     - Value: `jesstingley17/facefix-studio`
     - Apply to: Production and Preview

3. **Redeploy**:
   - Your app will now use your custom model!

## Troubleshooting

### Docker not running
```bash
# Start Docker Desktop app, then:
docker info  # Should show Docker info
```

### Out of disk space
- Need ~10GB free for model download and build
- Check: `df -h`

### Build fails
- Make sure Docker has enough resources (8GB+ RAM recommended)
- Check Docker Desktop → Settings → Resources

### Permission denied
```bash
chmod +x deploy.sh
```

## Model Features

Once deployed, your model will have:
- ✅ No content filtering (safety_checker disabled)
- ✅ Image-to-image editing with Stable Diffusion
- ✅ Supports adult content
- ✅ Fast inference (optimized)
- ✅ Full control over transformations

## Next Steps

After successful deployment:
1. Test your model at: https://replicate.com/jesstingley17/facefix-studio
2. Update Cloudflare Pages with `CUSTOM_MODEL` env var
3. Redeploy your app
4. Enjoy your unrestricted image generation! 🎉

