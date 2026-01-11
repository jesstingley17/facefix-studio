# Install and Deploy - Run These Commands

## Step 1: Install Docker Desktop (if not installed)

1. Download from: https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop
3. Wait until Docker is running (whale icon in menu bar)

Verify Docker is running:
```bash
docker info
```

## Step 2: Install Cog

Run these commands in your terminal:

```bash
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog
cog --version
```

## Step 3: Login to Replicate

Navigate to the model directory and login:

```bash
cd replicate-model
cog login
```

This will:
- Open a browser window
- Ask you to authenticate with Replicate
- Ask for your API token
- Save your credentials

## Step 4: Push the Model

Once logged in, push your model:

```bash
cog push r8.im/jesstingley17/facefix-studio
```

**First time:**
- Downloads Stable Diffusion model (~5GB) - takes 10-15 minutes
- Builds Docker image - takes 5-10 minutes  
- Uploads to Replicate - takes 5-10 minutes
- **Total: ~20-35 minutes**

**Subsequent pushes:**
- Much faster (~2-5 minutes) if only code changes

## Or Use the Automated Script

You can also run:

```bash
cd replicate-model
./deploy.sh
```

This script does steps 2-4 automatically (except Docker, which you need to install manually).

## Troubleshooting

### Docker not running
- Start Docker Desktop
- Wait for it to fully start (whale icon turns green)
- Run `docker info` to verify

### Permission denied
- Make sure you're using `sudo` for the install commands
- You'll be prompted for your Mac password

### Build fails
- Make sure Docker has enough resources (8GB+ RAM recommended)
- Check Docker Desktop → Settings → Resources

