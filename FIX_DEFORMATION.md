# Fixing Deformed/Unrecognizable Images

If the generated image looks nothing like the person or is completely deformed, use these fixes:

## IMMEDIATE FIX: Lower Strength

**The problem:** Strength parameter (0.35) is too high, causing the model to transform too much.

**The fix:** Lower strength to 0.20-0.25 to preserve identity.

### What Changed:
- **Strength: 0.35 → 0.25** (much lower = preserves face better)
- **Guidance: 7.0 → 7.5** (slightly higher to follow prompt while keeping face)

## Why This Happens

**High strength (0.35-0.50):**
- Model transforms too much
- Face gets deformed
- Person becomes unrecognizable
- Body parts may be wrong

**Low strength (0.20-0.30):**
- Preserves original face/body
- Makes subtle changes
- Person stays recognizable
- Better for identity preservation

## Parameter Settings for Likeness

### Maximum Likeness (Recommended):
```
strength: 0.20-0.25
guidance_scale: 7.0-8.0
steps: 50
```

### Balanced (Still preserves face):
```
strength: 0.25-0.30
guidance_scale: 7.5-8.0
steps: 50
```

### More Transformation (May lose likeness):
```
strength: 0.30-0.40
guidance_scale: 8.0-9.0
steps: 50
```

## Better Prompts for Identity Preservation

### Include Person Description:
```
"portrait of this person, [transformation], preserving their facial features and identity"
```

### Examples:
- "Professional headshot of this person, [transformation], natural lighting, preserving their exact facial features"
- "Portrait of this person, [transformation], maintaining their recognizable appearance"
- "Photograph of this person, [transformation], keeping their face and identity intact"

### Avoid:
- Generic prompts without mentioning "this person"
- Prompts that don't emphasize preserving identity
- Vague transformations

## Additional Tips

1. **Start with VERY low strength (0.20-0.25)**
2. **If too subtle, gradually increase to 0.30**
3. **Never go above 0.35** if you want to preserve likeness
4. **Use descriptive prompts** that mention preserving identity
5. **Test with simple prompts first** before complex transformations

## What Strength Does

- **0.20-0.25**: Preserves face, makes subtle changes (RECOMMENDED for likeness)
- **0.25-0.30**: Good balance, mostly preserves face
- **0.30-0.35**: More transformation, may start to lose likeness
- **0.35+**: Major transformation, face may be deformed

## Current Settings (After Fix)

✅ **Strength: 0.25** (preserves identity, prevents deformation)
✅ **Guidance: 7.5** (follows prompt while keeping face)
✅ **Steps: 50** (good quality)

## Test It Now

Try generating again with the new settings:
- Face should be preserved
- Person should be recognizable
- Only subtle changes applied
- No deformation

