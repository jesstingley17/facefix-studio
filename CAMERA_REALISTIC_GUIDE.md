# Making AI Images Look Camera-Real (Not AI-Generated)

Comprehensive guide for making outputs from `stability-ai/stable-diffusion-img2img` indistinguishable from real camera photos.

## Core Principles

| AI Tell-Tale Sign | How to Counter It |
|-------------------|-------------------|
| Over-smooth skin / plastic look | Add film grain, micro-texture, pore detail in prompt |
| Perfect symmetry | Use slight asymmetry prompts, lower guidance |
| Overly saturated / HDR look | Color grade to natural film profile |
| Unnatural bokeh / DOF | Specify real lens (e.g., "85mm f/1.4") |
| Missing EXIF / camera metadata | Inject realistic EXIF after generation |
| Too clean / no noise | Add sensor noise matching ISO |
| Perfectly sharp everywhere | Add subtle motion blur or focus falloff |

## Prompt Engineering for Camera Realism

### Good Prompt Template

```
RAW photograph, portrait of this person, 
shot on Canon EF 85mm f/1.4L, ISO 400,
professional studio lighting, softbox key light, fill light, subtle rim light,
Canon color science, rich skin tones, subtle warm cast,
shallow depth of field, natural bokeh,
authentic skin texture with visible pores,
subtle imperfections, natural facial asymmetry,
film grain, sensor noise,
realistic catch lights in eyes,
professional photography, editorial quality,
unedited raw photo look, not retouched,
subtle lens aberration, natural vignette
```

### Camera-Specific Prompts

**Canon:**
```
"Canon color science, rich skin tones, subtle warm cast,
shot on Canon 5D Mark IV with 85mm f/1.4, ISO 400"
```

**Sony:**
```
"Sony color profile, accurate colors, slight teal shadows,
shot on Sony A7III with 50mm f/1.2 GM, ISO 800"
```

**Fuji:**
```
"Fuji film simulation, classic chrome look, organic color rendering,
shot on Fuji X-T4 with 56mm f/1.2, ISO 640"
```

**Nikon:**
```
"Nikon color rendering, natural tones, balanced contrast,
shot on Nikon Z6 with 85mm f/1.8 S, ISO 400"
```

### Scene-Specific Lighting

**Studio:**
```
"professional studio lighting, softbox key light, fill light, subtle rim light"
```

**Natural:**
```
"natural window light, soft diffused daylight, gentle shadows"
```

**Outdoor:**
```
"golden hour sunlight, natural outdoor lighting, soft atmospheric haze"
```

**Indoor:**
```
"ambient indoor lighting, practical light sources, warm tungsten accent"
```

### What to Include

- **Real camera gear**: Lens (e.g., "85mm f/1.4"), ISO, camera brand
- **Lighting details**: Type of lighting, direction, quality
- **Camera characteristics**: Color science, film simulation
- **Realistic imperfections**: Pores, subtle asymmetry, natural variations
- **Technical details**: DOF, bokeh, grain, sensor noise
- **Professional terms**: "RAW photograph", "unedited", "editorial quality"

### What to Avoid (Triggers AI-Looking Output)

❌ **Avoid these words:**
- "hyper-realistic", "ultra-detailed", "8K", "masterpiece"
- "perfect", "flawless", "beautiful"
- "trending on artstation"
- "AI-generated", "digital art", "CGI"

✅ **Use instead:**
- "photorealistic", "professional photography"
- "authentic", "natural", "realistic"
- "editorial quality", "documentary style"

## Parameter Settings

### Strength (Most Important)

| Goal | Strength | Notes |
|------|----------|-------|
| Maximum likeness | 0.20–0.30 | Very close to reference, minimal change |
| **Balanced (recommended)** | **0.30–0.40** | **Good likeness + enhancement** |
| More stylization | 0.40–0.55 | Noticeable changes, still recognizable |
| Heavy transformation | 0.55+ | Major changes, may lose likeness |

**Current setting: 0.35** ✅

### Guidance Scale

| Value | Effect |
|-------|--------|
| 5–6 | Loose, more natural variation |
| **7–8** | **Balanced (recommended)** |
| 9–10 | Strict prompt following, can look artificial |

**Current setting: 7.0** ✅

### Steps

| Value | Effect |
|-------|--------|
| 30–40 | Faster, may have artifacts |
| **50–60** | **Optimal quality/speed balance** |
| 70+ | Diminishing returns, slower |

**Current setting: 50** ✅

## Negative Prompt

Current negative prompt targets AI artifacts:

```
artificial, fake, CGI, 3D render, digital art, illustration, painting, drawing, cartoon, anime,
plastic skin, airbrushed, over-processed, HDR, oversaturated, unnatural colors,
perfect symmetry, uncanny valley,
watermark, text, signature, logo,
blurry, low quality, jpeg artifacts,
extra fingers, deformed hands, bad anatomy,
floating elements, disconnected limbs,
AI generated, midjourney, stable diffusion, dall-e,
stock photo watermark, shutterstock,
hyper-realistic, ultra-detailed, 8K, masterpiece,
perfect, flawless, beautiful, trending on artstation
```

## Example Prompts

### Professional Headshot
```
RAW photograph, professional headshot of this person, neutral expression, looking at camera,
shot on Canon EF 85mm f/1.4L, ISO 400,
professional studio lighting, softbox key light, fill light,
Canon color science, rich skin tones,
shallow depth of field, natural bokeh,
authentic skin texture with visible pores,
subtle imperfections, natural facial asymmetry,
film grain, sensor noise,
realistic catch lights in eyes,
professional photography, editorial quality,
unedited raw photo look, not retouched
```

### Natural Portrait
```
RAW photograph, portrait of this person, natural expression,
shot on Sony FE 50mm f/1.2 GM, ISO 800,
natural window light, soft diffused daylight, gentle shadows,
Sony color profile, accurate colors,
shallow depth of field, natural bokeh,
authentic skin texture, subtle imperfections,
film grain, sensor noise,
professional photography, documentary style,
unedited raw photo look
```

### Studio Portrait
```
RAW photograph, studio portrait of this person,
shot on Nikon Z 85mm f/1.8 S, ISO 400,
professional studio lighting, softbox key light, fill light, subtle rim light,
Nikon color rendering, natural tones, balanced contrast,
shallow depth of field, natural bokeh,
authentic skin texture with visible pores,
subtle imperfections, natural facial asymmetry,
film grain, sensor noise,
realistic catch lights in eyes,
professional photography, editorial quality
```

## Tips for Best Results

1. **Reference quality matters most** - Start with a high-quality, in-focus photo
2. **Avoid "perfect" prompts** - Include realistic imperfections
3. **Specify real camera gear** - Models respond well to camera/lens/ISO details
4. **Include post-processing terms** - "unedited", "RAW photograph", "not retouched"
5. **Use descriptive lighting** - Specific lighting setups look more realistic
6. **Try multiple seeds** - Generate 3-5 variations and pick the best
7. **Lower strength for likeness** - 0.30-0.40 preserves identity best

## Post-Processing (Optional)

For even more realism, consider:

1. **Face Restoration** - Use GFPGAN or CodeFormer models
2. **Upscaling** - Use Real-ESRGAN or similar upscaler
3. **Color Grading** - Apply camera-specific color profiles
4. **Film Grain** - Add subtle sensor noise/film grain
5. **Vignette** - Add natural lens vignette
6. **EXIF Data** - Inject realistic camera metadata

## Current Settings Summary

✅ **Strength**: 0.35 (optimal for likeness preservation)  
✅ **Guidance Scale**: 7.0 (balanced, natural look)  
✅ **Steps**: 50 (high quality)  
✅ **Model**: `stability-ai/stable-diffusion-img2img`  
✅ **Negative Prompt**: Optimized to avoid AI artifacts  

## Ethics & Safety

- **Respect privacy**: Do not generate images of real people without consent
- **Check policies**: Review model and platform terms of service
- **Avoid misuse**: Do not create images intended to mislead or defame
- **Local laws**: Ensure compliance with applicable regulations

