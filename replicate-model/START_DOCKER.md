# Start Docker Desktop - Quick Guide

You're logged in to Replicate! ✅ But Docker needs to be running to push your model.

## Start Docker Desktop:

### Option 1: From Applications
1. Open **Finder**
2. Go to **Applications** folder
3. Find **Docker** app
4. Double-click to open it
5. Wait for the whale icon 🐋 to appear in your menu bar (top right)

### Option 2: From Spotlight
1. Press `Cmd + Space` (Spotlight search)
2. Type "Docker"
3. Press Enter
4. Wait for Docker Desktop to start

### Option 3: From Terminal
```bash
open -a Docker
```

## Verify Docker is Running:

Wait 30-60 seconds after starting Docker, then run:

```bash
docker info
```

If you see Docker information (not an error), Docker is running! ✅

## Then Push Your Model:

Once Docker is running:

```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
cog push r8.im/jesstingley17/facefix-studio
```

## What You'll See:

**First build takes 20-35 minutes:**
- Building Docker image... (5-10 min)
- Downloading Stable Diffusion model (~5GB)... (10-15 min)  
- Pushing to Replicate... (5-10 min)

You'll see progress bars for each step!

## Troubleshooting:

- **"Docker daemon not running"**: Make sure Docker Desktop app is open
- **Docker won't start**: Check System Preferences → Security & Privacy → Allow Docker
- **No whale icon**: Docker might still be starting - wait 1-2 minutes

Once the whale icon appears, you're ready to push! 🚀

