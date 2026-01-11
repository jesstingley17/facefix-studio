# Setting Up Your Custom Replicate Model

This guide will help you build and deploy your own Replicate model for image-to-image editing with full content freedom.

## Prerequisites

1. **Docker** - Must be installed and running
   ```bash
   docker info  # Test if Docker is running
   ```

2. **Replicate Account** - Sign up at https://replicate.com

## Step 1: Create Model Page on Replicate

1. Go to https://replicate.com/create
2. Choose a name (e.g., `facefix-studio` or `your-username/facefix-studio`)
3. Set it as **Private** (you can make it public later)
4. Note your username - you'll need it for the push command

## Step 2: Install Cog

Install Cog (the tool for building Replicate models):

```bash
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog
```

Verify installation:
```bash
cog --version
```

## Step 3: Login to Replicate

```bash
cog login
```

This will open a browser window for authentication. Copy your API token when prompted.

## Step 4: Navigate to Model Directory

```bash
cd replicate-model
```

## Step 5: Test Locally (Optional)

Test your model with a sample image:

```bash
cog predict -i image=@test-image.jpg -i prompt="make the person look like a cyberpunk character"
```

**Note:** First run will take 5-10 minutes to download the model (~5GB).

## Step 6: Push to Replicate

Replace `YOUR_USERNAME` with your actual Replicate username:

```bash
cog push r8.im/YOUR_USERNAME/facefix-studio
```

Or use whatever model name you chose in Step 1.

First push will take 15-30 minutes to build and upload.

## Step 7: Update Your App to Use Your Model

Once pushed, you'll get a model URL like: `your-username/facefix-studio:latest`

Update `functions/api/generate.ts` to use your custom model instead of fetching versions.

## Troubleshooting

- **Docker not running**: Start Docker Desktop or Docker service
- **Out of disk space**: Stable Diffusion models are large (~5GB)
- **Build fails**: Check Docker has enough resources (8GB+ RAM recommended)
- **Permission errors**: Make sure Cog is in PATH and executable

## Model Features

- ✅ No content filtering (safety_checker disabled)
- ✅ Image-to-image editing
- ✅ Full control over transformations
- ✅ Supports adult content
- ✅ Fast inference with optimizations

