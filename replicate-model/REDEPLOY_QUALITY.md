# Redeploy Model with Quality Improvements

Your model has been updated with quality improvements:
- **Resolution**: 512x512 → 768x768 (much better quality)
- **Default steps**: 20 → 40 (better quality)
- **Default guidance**: 7.5 → 10 (better prompt adherence)

## ⚠️ Before You Start

**Make sure Docker Desktop is running:**
1. Check for the whale icon 🐋 in your menu bar
2. If not running, open Docker Desktop and wait for it to start

## 🚀 Redeploy Steps

### Step 1: Navigate to Model Directory

```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
```

### Step 2: Push Updated Model

```bash
cog push r8.im/jesstingley17/facefix-studio
```

### Step 3: Wait for Build (20-35 minutes)

**What happens:**
- Docker builds new image with updated code
- Downloads model files (if needed)
- Pushes to Replicate
- Creates new model version

**You'll see:**
- Building Docker image...
- Downloading files...
- Pushing to Replicate...
- ✅ Successfully pushed!

## 📊 What's Changed

### Model Updates:
- **Resolution**: 768x768 (50% larger = much better detail)
- **Default steps**: 40 (2x more steps = better quality)
- **Default guidance**: 10 (better prompt adherence)

### API Already Updated:
- Using 40 steps (better quality)
- Using guidance 10 (better adherence)
- Better negative prompt (fewer artifacts)

## ⏱️ Timeline

- **Build time**: ~20-35 minutes (first build may be faster due to caching)
- **What you'll see**: Docker build progress, file downloads, upload progress
- **When done**: New model version will be available automatically

## ✅ After Deployment

**The new model version will be used automatically!**

Your Cloudflare Function already:
- Uses 40 steps
- Uses guidance 10
- Uses improved negative prompt

The model will now:
- Output 768x768 images (instead of 512x512)
- Use better defaults
- Produce much higher quality results

## 🔍 Verify Deployment

After deployment completes, check:
1. Go to: https://replicate.com/jesstingley17/facefix-studio
2. See the new version listed
3. Test on the website to verify quality

## 💡 Tips

- **Be patient**: First deployment can take 20-35 minutes
- **Don't close terminal**: Build will stop if you close it
- **Keep Docker running**: Don't quit Docker Desktop during build
- **Check logs**: If errors occur, check Docker Desktop logs

## 🎯 Ready to Deploy?

Run this command when ready:

```bash
cd /Users/jessica-leetingley/R2Sync/facefix-studio/replicate-model
cog push r8.im/jesstingley17/facefix-studio
```

Good luck! 🚀

