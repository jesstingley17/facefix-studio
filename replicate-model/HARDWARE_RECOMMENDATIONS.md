# Hardware Recommendations for Stable Diffusion Model

## Recommended: **T4 GPU** - $0.81/hour

**Why T4?**
- ✅ **16GB VRAM** - Perfect for Stable Diffusion v1.5 (~4-5GB model size)
- ✅ **Cost-effective** - Most affordable GPU option ($0.81/hr)
- ✅ **Fast enough** - 5-15 seconds per image generation
- ✅ **Proven** - Widely used for Stable Diffusion models

**Specs:**
- GPU: 1x Nvidia T4
- VRAM: 16GB
- RAM: 16GB
- CPU: 4x cores
- Cost: $0.81/hour (~$0.000225/second)

## Alternative Options

### If you need more speed/VRAM:

**L40S GPU** - $3.51/hour
- 48GB VRAM (3x more than T4)
- Faster inference (3-8 seconds per image)
- Better for larger images or concurrent requests
- 4.3x more expensive than T4

**A100 GPU** - $5.04/hour  
- 80GB VRAM (5x more than T4)
- Fastest inference (2-5 seconds per image)
- Best for production scale
- 6.2x more expensive than T4

## Current Configuration

The model is set to `gpu: true`, which means:
- Replicate will **automatically select** appropriate GPU hardware
- **Default behavior**: Usually assigns T4 or similar based on availability
- You can **optionally specify** hardware when creating the model on Replicate

## Setting Hardware on Replicate

When you create the model on Replicate:

1. **After creating the model page**, go to Settings → Hardware
2. **Choose**: T4 GPU (recommended) or leave default
3. **Default is usually fine** - Replicate auto-selects appropriate hardware

## Cost Estimate

**Per image generation** (average):
- T4: ~10 seconds = **$0.00225 per image** (~$2.25 per 1000 images)
- L40S: ~5 seconds = **$0.00487 per image** (~$4.87 per 1000 images)
- A100: ~3 seconds = **$0.00420 per image** (~$4.20 per 1000 images)

## Recommendation

**Start with T4** - it's the sweet spot for Stable Diffusion v1.5:
- Good performance
- Lowest cost
- Sufficient VRAM
- Upgrade later if you need more speed

You can always change hardware settings later on Replicate if needed.

