import { GoogleGenAI, Type } from "@google/genai";
import { LinguisticAnalysis } from "../types";

// Initialize Gemini Client
// Note: We create the client lazily to ensure API key is present
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeLyricsWithGemini = async (text: string): Promise<LinguisticAnalysis & { translation: string }> => {
  try {
    const ai = getClient();
    
    // Schema definition for strict JSON output
    const schema = {
      type: Type.OBJECT,
      properties: {
        links: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              fromWordIndex: { type: Type.INTEGER },
              toWordIndex: { type: Type.INTEGER },
              type: { type: Type.STRING, enum: ["consonant-vowel", "consonant-consonant", "vowel-vowel"] }
            },
            required: ["fromWordIndex", "toWordIndex", "type"]
          }
        },
        stress: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              wordIndex: { type: Type.INTEGER },
              charIndex: { type: Type.INTEGER }
            },
            required: ["wordIndex", "charIndex"]
          }
        },
        elisions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              wordIndex: { type: Type.INTEGER },
              charIndex: { type: Type.INTEGER }
            },
            required: ["wordIndex", "charIndex"]
          }
        },
        explanation: { type: Type.STRING },
        translation: { type: Type.STRING, description: "A natural, context-aware Chinese (Simplified) translation of the lyric line." }
      },
      required: ["links", "stress", "elisions", "explanation", "translation"]
    };

    const prompt = `
      Analyze the following English lyric line for pronunciation for a Chinese speaker.
      
      Identify:
      1. Linking (Liaison): Where one word flows into the next.
      2. Stress: The primary stressed letter/vowel in key words.
      3. Elision: Letters that are silent or barely pronounced (swallowed).
      4. Translation: Provide a Chinese translation.
      
      Lyric Line: "${text}"
      
      Return ONLY the JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2 // Low temperature for consistent analysis
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    return JSON.parse(jsonText) as LinguisticAnalysis & { translation: string };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return empty analysis on failure to not break UI
    return {
      links: [],
      stress: [],
      elisions: [],
      explanation: "Could not analyze this line.",
      translation: ""
    };
  }
};