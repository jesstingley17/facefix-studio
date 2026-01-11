# Install Docker Desktop

Docker is required to build and push your Replicate model. Here's how to install it:

## Option 1: Install Docker Desktop (Recommended)

### For Mac (your system):

1. **Download Docker Desktop:**
   - Go to: https://www.docker.com/products/docker-desktop/
   - Click "Download for Mac"
   - Choose "Mac with Intel chip" or "Mac with Apple chip" based on your Mac
     - To check: Apple menu → About This Mac → Chip

2. **Install:**
   - Open the downloaded `.dmg` file
   - Drag Docker to Applications folder
   - Open Docker from Applications

3. **Start Docker:**
   - Open Docker Desktop (it will be in Applications)
   - Wait for it to start (whale icon appears in menu bar)
   - First time may take a few minutes to initialize

4. **Verify Installation:**
   ```bash
   docker info
   ```
   Should show Docker information (not an error)

## Option 2: Use Homebrew (if you have it)

```bash
brew install --cask docker
```

Then open Docker Desktop from Applications.

## System Requirements

- **macOS**: 10.15 or later
- **RAM**: At least 4GB (8GB+ recommended)
- **Disk Space**: ~5GB free space

## After Installation

Once Docker Desktop is running:

1. **Verify it's working:**
   ```bash
   docker info
   docker run hello-world
   ```

2. **Then you can deploy your model:**
   ```bash
   cd replicate-model
   cog login
   cog push r8.im/jesstingley17/facefix-studio
   ```

## Troubleshooting

- **"Docker is not running"**: Start Docker Desktop app
- **Installation fails**: Make sure you have admin privileges
- **Slow startup**: First launch takes time, be patient
- **Permissions**: You may need to authorize Docker in System Preferences

Once Docker is installed and running, you're ready to deploy!

