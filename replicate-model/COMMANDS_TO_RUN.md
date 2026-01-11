# Commands to Run (Copy & Paste)

Run these commands in your terminal, one at a time:

## 1. Install Docker Desktop (if not installed)
Download from: https://www.docker.com/products/docker-desktop
Then start Docker Desktop and wait for it to be running.

## 2. Install Cog
```bash
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog
cog --version
```

## 3. Navigate to model directory
```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
```

## 4. Login to Replicate
```bash
cog login
```
(This opens a browser - authenticate with your Replicate account)

## 5. Push the model
```bash
cog push r8.im/jesstingley17/facefix-studio
```
(First time takes 20-35 minutes)

## OR: Run the automated script
```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
./deploy.sh
```

This script does steps 2-5 automatically (except you need to install Docker manually).

