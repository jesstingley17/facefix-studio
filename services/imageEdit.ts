/**
 * Unified image editing service
 * Tries Gemini first (faster, no polling), falls back to Replicate (more permissive)
 */

import { editPhoto as geminiEditPhoto } from './gemini';
import { editPhoto as replicateEditPhoto } from './replicate';

/**
 * Edit photo with Gemini first, fallback to Replicate
 * Benefits:
 * - Gemini: Fast, synchronous, good quality
 * - Replicate: More permissive, no content restrictions, fallback if Gemini blocks
 */
export const editPhoto = async (
  base64Image: string,
  userPrompt: string
): Promise<string> => {
  // Try Gemini first
  try {
    console.log('🎨 Attempting image generation with Gemini...');
    const result = await geminiEditPhoto(base64Image, userPrompt);
    console.log('✅ Gemini generation successful');
    return result;
  } catch (geminiError: any) {
    console.warn('⚠️ Gemini generation failed, falling back to Replicate:', geminiError.message);
    
    // Check if it's a content blocking issue (fallback to Replicate)
    const isContentBlocked = 
      geminiError.message?.includes('PROHIBITED_CONTENT') ||
      geminiError.message?.includes('blocked') ||
      geminiError.message?.includes('SAFETY') ||
      geminiError.message?.includes('RECITATION');
    
    // If it's a content blocking issue, always try Replicate
    // If it's another error (network, API, etc.), still try Replicate as fallback
    if (isContentBlocked) {
      console.log('🔄 Content blocked by Gemini, using Replicate fallback (no restrictions)...');
    } else {
      console.log('🔄 Gemini error occurred, trying Replicate fallback...');
    }
    
    try {
      const result = await replicateEditPhoto(base64Image, userPrompt);
      console.log('✅ Replicate fallback successful');
      return result;
    } catch (replicateError: any) {
      // If Replicate also fails, throw with both error messages
      console.error('❌ Both Gemini and Replicate failed');
      throw new Error(
        `Image generation failed with both services. ` +
        `Gemini: ${geminiError.message}. ` +
        `Replicate: ${replicateError.message}`
      );
    }
  }
};

