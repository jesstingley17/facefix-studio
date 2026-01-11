/**
 * Image editing service - Gemini only
 * Uses Gemini exclusively for better identity preservation and quality
 */

import { editPhoto as geminiEditPhoto } from './gemini';

/**
 * Edit photo with Gemini only
 * Benefits:
 * - Better identity preservation (no deformation issues)
 * - Higher quality results
 * - Faster, synchronous API
 * - No fallback - uses Gemini exclusively
 */
export const editPhoto = async (
  base64Image: string,
  userPrompt: string
): Promise<string> => {
  console.log('🎨 Generating image with Gemini (better identity preservation)...');
  const result = await geminiEditPhoto(base64Image, userPrompt);
  console.log('✅ Gemini generation successful');
  return result;
};

