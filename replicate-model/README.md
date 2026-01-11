# FaceFix Studio - Custom Replicate Model

Custom Stable Diffusion model for image-to-image editing with full content freedom.

## Setup

1. Install Cog:
```bash
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog
```

2. Login to Replicate:
```bash
cog login
```

3. Test locally:
```bash
cog predict -i image=@test-image.jpg -i prompt="make the person look like a cyberpunk character"
```

4. Push to Replicate:
```bash
cog push r8.im/YOUR_USERNAME/facefix-studio
```

Replace `YOUR_USERNAME` with your Replicate username.

## Model Features

- Image-to-image editing using Stable Diffusion
- Supports adult content (no content filtering)
- Uses ControlNet for better control over transformations
- Fast inference with optimized settings

