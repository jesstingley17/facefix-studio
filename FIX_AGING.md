# Fixing Unwanted Aging Effects

If the model is making the person look older or adding aging effects, here's how to fix it:

## The Fix Applied

**Added explicit anti-aging terms to negative prompt:**
- "aged, aging, wrinkles, old, elderly"
- "age progression, age regression"
- "aged face, wrinkles, fine lines"
- "sagging skin, age spots"
- "gray hair, white hair, balding"

## Why This Happens

The model might be:
1. **Interpreting the prompt** in a way that causes aging
2. **Defaulting to aging effects** without explicit prevention
3. **Transforming features** in ways that look like aging

## Additional Fixes

### 1. Check Your Prompt

**Avoid prompts that might cause aging:**
- ❌ "mature look"
- ❌ "professional appearance" (sometimes interpreted as older)
- ❌ "sophisticated" (can age the person)

**Use prompts that preserve youth:**
- ✅ "young, youthful appearance"
- ✅ "preserve age and youthfulness"
- ✅ "maintain current age"
- ✅ "natural, youthful skin"

### 2. Enhanced Prompt (Optional)

You can modify prompts to explicitly prevent aging:

```
"[your transformation], preserving youthfulness, maintaining current age, no aging effects, youthful appearance"
```

### 3. Current Settings

✅ **Strength: 0.25** (preserves identity, prevents deformation)
✅ **Guidance: 7.5** (follows prompt)
✅ **Negative prompt**: Now includes anti-aging terms

## Test It

Try generating again - the negative prompt should now prevent:
- Wrinkles
- Age spots
- Gray/white hair
- Sagging skin
- Any aging effects

## If Still Aging

If it's still aging the person:

1. **Check the prompt** - Make sure it doesn't mention aging
2. **Add to prompt**: "preserve youthfulness, maintain current age"
3. **Lower strength further**: Try 0.20 if needed
4. **Try different model**: Some models are better at preserving age

## Example Good Prompts

✅ "Portrait of this person, [transformation], preserving youthfulness and current age, natural youthful skin"
✅ "Professional headshot of this person, [transformation], maintaining their age and youthful appearance"
✅ "Photograph of this person, [transformation], no aging effects, preserve youthfulness"

