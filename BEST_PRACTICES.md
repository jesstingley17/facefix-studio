# Best Practices for Realistic Image Generation

Based on research and testing with `stability-ai/stable-diffusion-img2img`, here are the optimal settings for realistic results.

## Key Parameters

### Strength (Denoising)
- **Range**: 0.25-0.6
- **Current**: 0.45
- **Lower (0.25-0.4)**: Best for preserving identity and likeness
- **Higher (0.4-0.6)**: Allows more stylization while still maintaining resemblance
- **Too High (>0.6)**: Loses identity, becomes more like text-to-image

### Guidance Scale
- **Range**: 6-9
- **Current**: 7.5
- **Lower (6-7)**: Looser adherence to prompt, more natural
- **Higher (8-9)**: Stricter adherence, but can over-sharpen
- **Too High (>9)**: Can create artifacts and unnatural sharpness

### Inference Steps
- **Range**: 30-60
- **Current**: 50
- **More steps**: Cleaner details but slower
- **Fewer steps**: Faster but may have artifacts

## Image Pre-processing

### Resolution
- Use dimensions divisible by 64 (e.g., 512, 768, 1024)
- Current: 768x768 (optimal)
- Higher resolution = better quality but slower

### Cropping & Alignment
- Center-crop to square if needed
- Ensure subject is centered
- Consistent portion of frame occupied by subject

## Prompt Engineering

### Good Prompt Template
```
"Photorealistic portrait of this person, natural studio lighting, soft skin detail, realistic eyes, natural color grading"
```

### Better Prompts Include:
- Lighting description: "natural softbox lighting", "studio lighting"
- Camera details: "50mm portrait, f/2.0"
- Quality terms: "high detail", "filmic color grading"
- Expression: "neutral expression", "natural smile"

### Negative Prompt
```
"cartoon, painterly, low resolution, watermark, text, extra fingers, distorted face, bad anatomy, deformed, disfigured, poorly drawn, bad hands, bad proportions, extra limbs, ugly, poorly rendered face, bad composition, cloned face, gross proportions, malformed, mutated, mutilated, out of frame, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry"
```

## Optional Post-processing

### Face Restoration
- Use GFPGAN or CodeFormer models on Replicate
- Improves face realism and skin texture
- Run after img2img generation

### Upscaling
- Use Real-ESRGAN or similar upscaler
- Increase resolution without losing quality
- Run after face restoration

## Seed Management

- Use consistent seeds for reproducibility
- Try multiple seeds (1-10) to find best result
- Save good seeds for future use

## Current Settings

Your app now uses:
- **Strength**: 0.45 (optimal for identity preservation)
- **Guidance Scale**: 7.5 (balanced prompt adherence)
- **Steps**: 50 (high quality)
- **Resolution**: 768x768 (good quality/speed balance)
- **Model**: `stability-ai/stable-diffusion-img2img` (pre-built, stable)

## Tips for Best Results

1. **Use high-quality reference images** - Large, in-focus, neutral background
2. **Center and crop** - Subject should be centered and occupy consistent frame portion
3. **Descriptive prompts** - Include lighting, camera, and quality terms
4. **Try multiple seeds** - Generate 3-5 variations and pick the best
5. **Post-process if needed** - Face restoration and upscaling can improve results

## Example Workflow

1. Upload high-quality reference image
2. Use descriptive prompt with lighting/camera details
3. Generate with strength 0.45, guidance 7.5, steps 50
4. Try 3-5 different seeds
5. Select best result
6. (Optional) Run face restoration
7. (Optional) Upscale final image

## Ethics & Safety

- **Respect privacy**: Do not generate images of real people without consent
- **Check policies**: Review model and platform terms of service
- **Avoid misuse**: Do not create images intended to mislead or defame
- **Local laws**: Ensure compliance with applicable regulations

