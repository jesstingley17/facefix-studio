/**
 * Unified image editing service
 * Tries Gemini first (faster, better identity preservation), falls back to Replicate (asiryan/babes-xl)
 */

import { editPhoto as geminiEditPhoto } from './gemini';
import { editPhoto as replicateEditPhoto } from './replicate';

/**
 * Edit photo with Gemini first, fallback to Replicate (babes-xl)
 * Benefits:
 * - Gemini: Fast, synchronous, better identity preservation
 * - Replicate (babes-xl): More permissive, no content restrictions, fallback if Gemini fails/blocks
 */
export const editPhoto = async (
  base64Image: string,
  userPrompt: string
): Promise<string> => {
  // Try Gemini first
  try {
    console.log('🎨 Attempting image generation with Gemini (better identity preservation)...');
    const result = await geminiEditPhoto(base64Image, userPrompt);
    console.log('✅ Gemini generation successful');
    return result;
  } catch (geminiError: any) {
    console.warn('⚠️ Gemini generation failed, falling back to Replicate (babes-xl):', geminiError.message);
    
    // Check if it's a content blocking issue (fallback to Replicate)
    const isContentBlocked = 
      geminiError.message?.includes('PROHIBITED_CONTENT') ||
      geminiError.message?.includes('blocked') ||
      geminiError.message?.includes('SAFETY') ||
      geminiError.message?.includes('RECITATION') ||
      geminiError.message?.includes('API key not valid');
    
    if (isContentBlocked) {
      console.log('🔄 Content blocked by Gemini or API issue, using Replicate fallback (babes-xl)...');
    } else {
      console.log('🔄 Gemini error occurred, trying Replicate fallback (babes-xl)...');
    }
    
    try {
      const result = await replicateEditPhoto(base64Image, userPrompt);
      console.log('✅ Replicate fallback (babes-xl) successful');
      return result;
    } catch (replicateError: any) {
      console.error('❌ Both Gemini and Replicate failed');
      throw new Error(
        `Image generation failed with both services. ` +
        `Gemini: ${geminiError.message}. ` +
        `Replicate (babes-xl): ${replicateError.message}`
      );
    }
  }
};

