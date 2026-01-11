# Quick Start - Deploy Your Model

## Prerequisites Check

1. **Docker must be running**
   ```bash
   docker info
   ```
   If it fails, start Docker Desktop or Docker service.

2. **Create the model on Replicate first**:
   - Go to: https://replicate.com/create
   - Name: `facefix-studio`
   - Visibility: Private (or Public)
   - Click Create

## Deploy (One Command)

```bash
cd replicate-model
./deploy.sh
```

Or manually:

```bash
# Install Cog (if not installed)
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog

# Login (opens browser)
cog login

# Build and push (takes 15-30 min first time)
cog push r8.im/jesstingley17/facefix-studio
```

## After Deployment

1. Add to Cloudflare Pages environment variables:
   - Variable: `CUSTOM_MODEL`
   - Value: `jesstingley17/facefix-studio`
   - Apply to: Production and Preview

2. Redeploy your app - it will now use your custom model!

## Troubleshooting

- **Docker not running**: Start Docker Desktop
- **Out of space**: Need ~10GB free space for model download and build
- **Slow build**: First build takes 15-30 minutes (downloading large model)
- **Permission denied**: Run `chmod +x deploy.sh` first

