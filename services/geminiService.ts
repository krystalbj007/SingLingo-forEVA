import { GoogleGenAI, Type } from "@google/genai";
import { LinguisticAnalysis } from "../types";

// Initialize Gemini Client
// Note: We create the client lazily to ensure API key is present
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // Suppress warning in production/demo mode
    console.log("No API Key found. Running in Offline Demo Mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeLyricsWithGemini = async (text: string): Promise<LinguisticAnalysis & { translation: string }> => {
  try {
    const ai = getClient();
    
    if (!ai) {
       // Mock logic for demo/fallback
       await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
       const words = text.split(' ');
       return {
          links: [],
          stress: [],
          elisions: [],
          explanation: "Offline Mode: Analysis unavailable for new content.",
          translation: ""
       };
    }
    
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
              type: { type: Type.STRING, enum: ["consonant-vowel", "consonant-consonant", "vowel-vowel", "vowel-consonant"] }
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
      model: "gemini-1.5-flash-001", // Use specific version to avoid 404
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
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