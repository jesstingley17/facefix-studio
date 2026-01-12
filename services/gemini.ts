
import { GoogleGenAI, Type } from "@google/genai";
import { FaceLandmarks } from "../types";

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API Key not found. Please set GEMINI_API_KEY environment variable.");
  return new GoogleGenAI({ apiKey });
};

/**
 * Stage 1: Map the face landmarks using Gemini 3 Flash
 */
export const detectLandmarks = async (base64Image: string): Promise<FaceLandmarks> => {
  const ai = getAIClient();
  
  const prompt = `
    Analyze this portrait and identify the exact facial landmarks. 
    Return a list of key points with their (x, y) coordinates where (0,0) is top-left and (1000, 1000) is bottom-right.
    Also provide a brief technical description of the unique facial geometry.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { data: base64Image.split(',')[1] || base64Image, mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            points: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER }
                },
                required: ["name", "x", "y"]
              }
            },
            description: { type: Type.STRING }
          },
          required: ["points", "description"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    return data as FaceLandmarks;
  } catch (error) {
    console.error("Landmark Detection Error:", error);
    throw new Error("Failed to map face landmarks.");
  }
};

/**
 * Edit photo with UNLIMITED creative freedom - NO RESTRICTIONS
 * Face mapping disabled - direct image transformation
 * Explicitly allows sensual, artistic, adult content, shirtless/topless photos
 */
import { resizeImage } from '../utils/imageResize';
import { enhancePrompt } from './promptEnhancer';

export const editPhoto = async (
  base64Image: string, 
  userPrompt: string
): Promise<string> => {
  const ai = getAIClient();

  // Require a prompt - no automatic generation without user input
  if (!userPrompt || !userPrompt.trim()) {
    throw new Error("Prompt is required for image generation.");
  }

  // Enhance prompt using AI for best results
  console.log('✨ Enhancing prompt with AI for optimal results...');
  const enhancedPrompt = await enhancePrompt(userPrompt);

  // Resize image before sending (Gemini also has size limits and helps prevent issues)
  console.log('📐 Resizing image for Gemini...');
  const resizedImage = await resizeImage(base64Image, 1024, 1024);

  // Enhanced prompt for best quality photo generation - define, refine, sharpen, and enhance every detail
  // Gemini will produce publication-ready, professional-grade images with maximum detailing and sharpening
  // Using AI-enhanced prompt for optimal results
  const systemContext = `Enhance, define, refine, detail, and sharpen this photo to the highest quality standards: "${enhancedPrompt}".

QUALITY REQUIREMENTS (MANDATORY):
- HIGH-FIDELITY OUTPUT: Generate a professional-grade, publication-ready image with maximum detail and clarity
- DETAILING: Apply advanced detailing techniques to all elements - enhance fine details, textures, and micro-features
- SHARPENING: Apply professional sharpening techniques for crisp, clear details throughout - no blurriness or soft focus
- DETAIL REFINEMENT: Sharpen and define all details - skin texture, hair strands, fabric patterns, environmental elements
- COLOR ENHANCEMENT: Enhance colors with natural, vibrant, well-balanced tones. Improve color depth and saturation appropriately
- LIGHTING OPTIMIZATION: Refine lighting to be natural, flattering, and professional. Add depth through proper highlights and shadows
- SHARPNESS & CLARITY: Ensure maximum sharpness and clarity - crisp edges, clear details, professional sharpening
- SKIN TEXTURE: Maintain realistic, natural skin texture with fine details, visible pores, natural texture patterns, subtle skin imperfections, realistic skin tone variations, natural skin shine and reflections, detailed skin surface quality, natural skin elasticity appearance, realistic skin depth and dimensionality, authentic skin translucency, natural skin smoothness with realistic texture, fine skin wrinkles and creases where natural, natural skin pore visibility, realistic skin bumpiness and texture variations, natural skin moisture appearance, authentic skin matte/satin finish where appropriate
- EYE DETAIL: Sharpen and enhance eye detail - clear iris patterns, visible eyelashes, sharp reflections, defined pupils
- HAIR DETAIL: Define and sharpen individual hair strands and textures for realistic, detailed appearance
- BACKGROUND REFINEMENT: Enhance and sharpen background details while maintaining proper focus on subject
- EDGE SHARPENING: Apply edge sharpening to define boundaries and improve overall image crispness
- OVERALL POLISH: Apply professional photo editing techniques including advanced sharpening and detailing for polished finish

DETAILING & SHARPENING SPECIFICATIONS:
- Apply unsharp mask techniques for professional sharpening
- Enhance fine details and textures throughout the image
- Sharpen edges and boundaries for crisp definition
- Improve detail visibility in all areas - skin, hair, eyes, clothing, background
- Apply selective sharpening where appropriate
- Maintain natural appearance while maximizing detail visibility
- Ensure no oversharpening artifacts or halos

TRANSFORMATION GUIDELINES:
- Apply the requested transformation: "${userPrompt}"
- ABSOLUTE REQUIREMENT: DO NOT ALTER, MODIFY, OR CHANGE ANY FACIAL FEATURES FROM THE REFERENCE PHOTO
- CRITICAL: The reference photo shows the EXACT person to generate - copy their face precisely, do not create a different person
- PRESERVE FACIAL IDENTITY STRICTLY: Keep the EXACT same face from the reference photo:
  * Same eye shape, size, color, and position
  * Same nose shape, size, and structure
  * Same mouth shape, lip size, and position
  * Same face shape and contours
  * Same bone structure (jawline, cheekbones, forehead)
  * Same eyebrow shape and position
  * Same facial proportions and spacing between features
  * Same skin tone and texture
  * Same distinctive facial characteristics (moles, freckles, etc.)
- DO NOT CHANGE: Facial structure, bone structure, facial geometry, feature sizes, feature positions, or any distinguishing characteristics
- DO NOT ALTER: Eye color, eye shape, nose shape, mouth shape, face shape, jawline, cheekbones, or any facial features
- KEEP SAME PERSON: Generate the exact same person from the reference photo - the face must be identical, only apply the requested transformation to other aspects
- Preserve facial proportions, spacing between features, and overall facial geometry EXACTLY as in the reference photo
- Only modify what is explicitly requested in the transformation - keep ALL facial features identical to the reference photo
- Ensure the generated image shows the EXACT same person with the EXACT same face as in the reference photo
- Maintain body proportions and overall appearance from the reference photo

TECHNICAL STANDARDS:
- Resolution: Maximum quality and detail
- Compression: Minimal, preserve all details
- Artifacts: None - clean, artifact-free output
- Noise: Minimized, clean image
- Color Grading: Professional, natural color grading
- Sharpening: Professional-grade sharpening applied
- Detailing: Advanced detailing techniques applied

Output a single, highest-quality, professionally enhanced, detailed, and sharpened image matching the requested transformation.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: resizedImage.split(',')[1] || resizedImage,
              mimeType: 'image/png',
            },
          },
          {
            text: systemContext,
          },
        ],
      },
      // Maximally permissive safety settings - explicitly allow all content including shirtless/topless, sensual/adult
      config: {
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ],
        generationConfig: {
          temperature: 1.0,
          topK: 40,
          topP: 0.95
        }
      }
    });

    // Check if response was blocked
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("Image generation failed. The model blocked the content or returned no candidates.");
    }

    const candidate = response.candidates[0];
    
    // Check for safety blocking
    if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION' || candidate.finishReason === 'PROHIBITED_CONTENT' || candidate.finishReason === 'IMAGE_SAFETY') {
      const safetyRatings = candidate.safetyRatings || [];
      const blockedCategories = safetyRatings
        .filter((r: any) => r.blocked === true)
        .map((r: any) => r.category)
        .join(', ');
      
      let errorMsg = '';
      if (candidate.finishReason === 'PROHIBITED_CONTENT' || candidate.finishReason === 'IMAGE_SAFETY') {
        errorMsg = `Image generation blocked: ${candidate.finishReason}. Google's Gemini API has hard model-level restrictions that cannot be bypassed, even with BLOCK_NONE safety settings. Gemini blocks certain content types (including some adult/explicit content) at the model level regardless of API settings.`;
      } else {
        errorMsg = `Image generation blocked by safety filters${blockedCategories ? ` (${blockedCategories})` : ''}. Despite BLOCK_NONE settings, the model may still block certain content.`;
      }
      errorMsg += ` Gemini has limitations for adult/explicit content generation. Consider using a different AI service that supports unrestricted content generation, or adjust your prompt/image to be less explicit.`;
      
      throw new Error(errorMsg);
    }

    // Check for other blocking reasons
    if (candidate.finishReason && candidate.finishReason !== 'STOP') {
      throw new Error(`Image generation failed. Finish reason: ${candidate.finishReason}. The model refused to generate content based on the input.`);
    }

    // Extract image data
    let imageUrl = '';
    if (candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
        // Also check for text parts in case of error messages
        if (part.text) {
          console.warn("Model returned text instead of image:", part.text);
        }
      }
    }

    if (!imageUrl) {
      // Log full response for debugging
      console.error("Full response structure:", JSON.stringify(response, null, 2));
      throw new Error("Image generation failed. The model returned no image data. The content may have been blocked despite safety settings.");
    }

    return imageUrl;
  } catch (error: any) {
    console.error("Gemini Image Editing Error:", error);
    
    // If it's already our custom error, throw it as-is
    if (error.message && error.message.includes("Image generation")) {
      throw error;
    }
    
    // Otherwise wrap it
    throw new Error(error.message || "An unexpected error occurred during image generation.");
  }
};
