#!/bin/bash

# Deploy script for FaceFix Studio Replicate Model
# Usage: ./deploy.sh

echo "🚀 Deploying FaceFix Studio model to Replicate..."
echo ""

# Check if Cog is installed
if ! command -v cog &> /dev/null; then
    echo "❌ Cog is not installed. Installing now..."
    sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
    sudo chmod +x /usr/local/bin/cog
    echo "✅ Cog installed!"
else
    echo "✅ Cog is installed"
fi

echo ""
echo "📋 Model will be deployed as: jesstingley17/facefix-studio"
echo ""

# Check if logged in
echo "Checking Replicate authentication..."
if ! cog whoami &> /dev/null; then
    echo "⚠️  Not logged in to Replicate. Please log in now..."
    cog login
else
    echo "✅ Already logged in to Replicate"
    cog whoami
fi

echo ""
echo "🔨 Building and pushing model to Replicate..."
echo "⚠️  This will take 15-30 minutes on first build (downloading ~5GB model)..."
echo ""

# Push the model
cog push r8.im/jesstingley17/facefix-studio

echo ""
echo "✅ Done! Your model is now available at:"
echo "   https://replicate.com/jesstingley17/facefix-studio"
echo ""
echo "📝 Next steps:"
echo "   1. Add environment variable to Cloudflare Pages:"
echo "      CUSTOM_MODEL=jesstingley17/facefix-studio"
echo "   2. Deploy your app and it will use your custom model!"

