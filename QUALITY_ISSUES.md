# Addressing Image Quality Issues

If the generated images look "awful" or not realistic, here are things to check and improve:

## Quick Checks

1. **What specifically looks bad?**
   - Too blurry?
   - Wrong colors?
   - Doesn't match the prompt?
   - Looks AI-generated?
   - Lost the person's likeness?

2. **What prompt did you use?**
   - Short/generic prompts often produce poor results
   - Need detailed, descriptive prompts

3. **What was the original image?**
   - Quality of input affects output
   - Low-res or blurry inputs = poor outputs

## Common Issues & Fixes

### Issue: Looks AI-Generated / Fake

**Fix:**
- Use camera-realistic prompts (see CAMERA_REALISTIC_GUIDE.md)
- Add: "RAW photograph", "shot on Canon 85mm f/1.4", "film grain"
- Lower strength (0.25-0.35 for more likeness)
- Better negative prompt

### Issue: Doesn't Match Prompt

**Fix:**
- Increase guidance_scale (7.5-9.0)
- Use more descriptive prompts
- Add camera/lens details
- Specify lighting, style, etc.

### Issue: Too Blurry / Low Quality

**Fix:**
- Increase steps (50-60)
- Use better quality input image
- Try different model (SDXL instead of SD v1.5)
- Add quality terms to prompt

### Issue: Lost Person's Likeness

**Fix:**
- Lower strength (0.25-0.30)
- Better input image quality
- More descriptive prompt about the person
- Use lower guidance_scale (6.0-7.0)

## Try These Settings

### For Maximum Likeness:
```typescript
strength: 0.25-0.30
guidance_scale: 7.0
steps: 50
```

### For Better Quality:
```typescript
strength: 0.35-0.40
guidance_scale: 8.0-9.0
steps: 60
```

### For Camera-Realistic:
Use prompts from CAMERA_REALISTIC_GUIDE.md:
- "RAW photograph, portrait of this person..."
- "shot on Canon EF 85mm f/1.4L, ISO 400"
- "professional studio lighting"
- "authentic skin texture with visible pores"
- "film grain, sensor noise"

## Better Prompts

Instead of:
❌ "make her shirtless"
❌ "transform into fantasy character"
❌ "add sunglasses"

Try:
✅ "RAW photograph, portrait of this person, shirtless, natural skin texture, professional studio lighting, shot on Canon 85mm f/1.4, ISO 400, film grain"
✅ "Photorealistic portrait of this person as a fantasy character, detailed costume, professional photography, natural lighting, high detail"
✅ "Professional headshot of this person wearing sunglasses, natural lighting, authentic skin texture, shot on Sony A7III, 50mm f/1.2"

## Model Alternatives

If quality is still poor:

1. **Try SDXL model** - Better quality than SD v1.5
2. **Use different img2img model** on Replicate
3. **Adjust parameters** - Each model has different optimal settings

## What To Share For Help

1. The original image
2. The prompt you used
3. What you wanted vs. what you got
4. Screenshot of the result
5. Browser console errors (if any)

