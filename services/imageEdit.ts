/**
 * Unified image editing service
 * Uses Gemini for every photo generation with professional enhancement
 * Falls back to Replicate only if Gemini fails (content blocking, API errors)
 */

import { editPhoto as geminiEditPhoto } from './gemini';
import { editPhoto as replicateEditPhoto } from './replicate';

/**
 * Edit photo with Gemini - enhanced for every generation
 * Benefits:
 * - Gemini: Professional photo enhancement, better identity preservation, fast, synchronous
 * - Replicate (babes-xl): Fallback only if Gemini fails/blocks content
 * 
 * Gemini enhances every photo generation with professional quality improvements
 */
export const editPhoto = async (
  base64Image: string,
  userPrompt: string
): Promise<string> => {
  // Always try Gemini first - enhances every photo generation
  try {
    console.log('🎨 Enhancing photo with Gemini AI (professional quality)...');
    const result = await geminiEditPhoto(base64Image, userPrompt);
    console.log('✅ Gemini enhancement successful - professional quality image generated');
    return result;
  } catch (geminiError: any) {
    console.warn('⚠️ Gemini enhancement failed, falling back to Replicate (babes-xl):', geminiError.message);
    
    // Only fallback to Replicate if Gemini fails
    // Check if it's a content blocking issue (fallback to Replicate)
    const isContentBlocked = 
      geminiError.message?.includes('PROHIBITED_CONTENT') ||
      geminiError.message?.includes('blocked') ||
      geminiError.message?.includes('SAFETY') ||
      geminiError.message?.includes('RECITATION') ||
      geminiError.message?.includes('API key not valid');
    
    if (isContentBlocked) {
      console.log('🔄 Content blocked by Gemini, using Replicate fallback (babes-xl)...');
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

