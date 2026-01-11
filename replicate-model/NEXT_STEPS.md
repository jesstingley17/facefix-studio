# Next Steps - You're Almost Ready!

## ✅ Cog is Installed (v0.16.9)

## ⚠️ Next: Start Docker Desktop

1. **Open Docker Desktop** on your Mac
   - Look for Docker in Applications folder
   - Or search "Docker" in Spotlight

2. **Wait for Docker to start**
   - Look for the whale icon 🐋 in your menu bar
   - Wait until it shows "Docker Desktop is running"

3. **Verify Docker is running:**
   ```bash
   docker info
   ```
   Should show Docker information (not an error)

## Then Run These Commands:

```bash
# Navigate to model directory
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model

# Login to Replicate (opens browser)
cog login

# Push the model (takes 20-35 minutes first time)
cog push r8.im/jesstingley17/facefix-studio
```

## Or Use the Automated Script:

Once Docker is running:

```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
./deploy.sh
```

This will:
- Check everything is ready
- Prompt you to login if needed
- Push the model automatically

## What to Expect:

**First build:**
- Downloads Stable Diffusion model (~5GB) - 10-15 minutes
- Builds Docker image - 5-10 minutes
- Uploads to Replicate - 5-10 minutes
- **Total: ~20-35 minutes**

**Progress:**
- You'll see download progress for the model
- Docker build progress
- Upload progress
- Final confirmation when done

## After Successful Push:

Your model will be at:
- **URL**: https://replicate.com/jesstingley17/facefix-studio
- **Model ID**: `jesstingley17/facefix-studio`

Then update Cloudflare Pages:
- Add environment variable: `CUSTOM_MODEL=jesstingley17/facefix-studio`

