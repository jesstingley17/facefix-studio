# Ultra Low Strength Settings

If the person is STILL deformed, the strength might need to be even lower.

## Current Settings

- **Strength: 0.20** (ultra low - minimum transformation)
- **Guidance: 7.0** (lower to be gentler)
- **Enhanced prompt**: Includes identity preservation terms

## Why 0.20?

**Strength 0.15-0.20:**
- Minimal transformation
- Maximum identity preservation
- Very close to original
- Prevents deformation

**Strength 0.20-0.25:**
- Low transformation
- Good identity preservation
- Subtle changes only

**Strength 0.25-0.30:**
- Moderate transformation
- May start losing likeness
- More noticeable changes

## If Still Deformed

If strength 0.20 is still causing deformation:

1. **Try even lower: 0.15** (almost no transformation)
2. **Check the model** - Some models are better at preserving identity
3. **Try different model** - SDXL might be better
4. **Check input image quality** - Low quality input = poor output

## Trade-off

**Lower strength (0.15-0.20):**
- ✅ Preserves identity perfectly
- ✅ No deformation
- ❌ Very subtle changes (may not transform much)

**Higher strength (0.30-0.40):**
- ✅ More noticeable transformation
- ❌ May cause deformation
- ❌ May lose likeness

## Recommendation

**For maximum identity preservation:**
- Strength: 0.15-0.20
- Guidance: 6.5-7.0
- Steps: 50
- Enhanced prompt with identity terms

This should prevent deformation but may not transform as much.

