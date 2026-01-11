/**
 * Image editing service - Gemini only
 * Uses Gemini exclusively for all photo generation with professional enhancement
 */

import { editPhoto as geminiEditPhoto } from './gemini';

/**
 * Edit photo with Gemini - define, refine, and enhance every generation for best quality
 * Benefits:
 * - Gemini: Maximum quality output with detail refinement, professional enhancement, better identity preservation
 * - Fast, synchronous API
 * - Professional photo enhancement
 * - Best identity preservation
 * 
 * Gemini defines, refines, and enhances every photo generation to the highest quality standards
 */
export const editPhoto = async (
  base64Image: string,
  userPrompt: string
): Promise<string> => {
  console.log('🎨 Enhancing photo with Gemini AI (defining, refining, and enhancing for best quality)...');
  const result = await geminiEditPhoto(base64Image, userPrompt);
  console.log('✅ Gemini enhancement successful - highest quality, refined image generated');
  return result;
};

