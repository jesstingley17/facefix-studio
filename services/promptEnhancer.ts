/**
 * Prompt Enhancement Service
 * Uses Gemini to optimize user prompts for best image generation results
 * Enhances prompts with professional photography terms, quality specifications, and detail requirements
 */

import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API Key not found. Please set GEMINI_API_KEY environment variable.");
  return new GoogleGenAI({ apiKey });
};

/**
 * Enhance user prompt for best image generation results
 * Optimizes prompt with professional photography terms, quality specs, and detail requirements
 */
export async function enhancePrompt(userPrompt: string): Promise<string> {
  const ai = getAIClient();

  // Don't enhance empty prompts
  if (!userPrompt || !userPrompt.trim()) {
    return userPrompt;
  }

  const enhancementPrompt = `Optimize and enhance this image generation prompt for the best quality results: "${userPrompt}"

Your task is to refine this prompt to ensure maximum quality, detail, and professional results from an AI image generation model.

OPTIMIZATION REQUIREMENTS:
1. Add professional photography terms that enhance quality (e.g., "high detail", "sharp focus", "professional lighting")
2. Include quality specifications (e.g., "4K quality", "high resolution", "detailed textures")
3. Add detail enhancement terms (e.g., "fine details", "sharp", "crisp", "defined")
4. Include professional editing terms (e.g., "enhanced colors", "natural color grading", "professional polish")
5. CRITICAL: Add terms that preserve facial identity (e.g., "same face", "identical facial features", "preserve face structure", "keep same person", "maintain facial identity", "exact facial match")
6. Emphasize preserving the exact facial features, structure, and appearance from the reference photo
7. Maintain the original intent and transformation request
8. Keep the prompt concise but effective (not too long, but include key quality terms)
9. Ensure the prompt will produce sharp, detailed, high-quality results while preserving the original person's identity
10. Add terms that emphasize realism and professional quality

OUTPUT FORMAT:
Return ONLY the enhanced prompt, nothing else. No explanations, no markdown, just the optimized prompt text.

Example enhancement:
Input: "make her shirtless"
Enhanced: "professional portrait, shirtless, high detail, sharp focus, natural lighting, detailed textures, enhanced colors, realistic skin, 4K quality, professional polish"

Now enhance this prompt: "${userPrompt}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            text: enhancementPrompt,
          },
        ],
      },
      config: {
        temperature: 0.7, // Balanced creativity and consistency
        topK: 40,
        topP: 0.95,
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      console.warn('Prompt enhancement failed, using original prompt');
      return userPrompt;
    }

    const candidate = response.candidates[0];
    
    // Check for blocking
    if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION' || candidate.finishReason === 'PROHIBITED_CONTENT') {
      console.warn('Prompt enhancement was blocked, using original prompt');
      return userPrompt;
    }

    // Extract enhanced prompt
    const enhancedText = candidate.content?.parts?.[0]?.text?.trim() || userPrompt;
    
    // Clean up the response (remove quotes, extra whitespace, etc.)
    let cleanedPrompt = enhancedText
      .replace(/^["']|["']$/g, '') // Remove surrounding quotes
      .trim();

    // If the enhanced prompt is too short or seems invalid, use original
    if (cleanedPrompt.length < userPrompt.length * 0.5) {
      console.warn('Enhanced prompt seems too short, using original');
      return userPrompt;
    }

    console.log(`✅ Prompt enhanced: "${userPrompt}" → "${cleanedPrompt.substring(0, 100)}..."`);
    return cleanedPrompt;
  } catch (error: any) {
    console.warn('Prompt enhancement failed, using original prompt:', error.message);
    return userPrompt; // Fallback to original prompt
  }
}

