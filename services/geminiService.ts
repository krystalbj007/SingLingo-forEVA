import { GoogleGenAI, Type } from "@google/genai";
import { LinguisticAnalysis } from "../types";

// --- CONFIGURATION ---
// TODO: Enter your Gemini API Key here
// You can also set it in your browser's Local Storage with key: "GEMINI_API_KEY"
export const USER_PROVIDED_API_KEY = ""; 
// ---------------------

// Initialize Gemini Client
// Note: We create the client lazily to ensure API key is present
const getClient = () => {
  // Priority: 1. Local Storage, 2. Hardcoded Variable, 3. Environment Variable
  const apiKey = localStorage.getItem("GEMINI_API_KEY") || USER_PROVIDED_API_KEY || process.env.API_KEY;

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
        translation: { type: Type.STRING, description: "A natural, context-aware Chinese (Simplified) translation of the lyric line. Do NOT include Pinyin." }
      },
      required: ["links", "stress", "elisions", "explanation", "translation"]
    };

    const prompt = `
      Analyze the following English lyric line for pronunciation for a Chinese speaker.
      
      Identify:
      1. Linking (Liaison): Where one word flows into the next.
      2. Stress: The primary stressed letter/vowel in key words.
      3. Elision: Letters that are silent or barely pronounced (swallowed).
      4. Translation: Provide a Chinese translation (Simplified Chinese ONLY). Do NOT include Pinyin.
      
      Lyric Line: "${text}"
      
      Return ONLY the JSON matching the schema.
    `;

    // List of models to try in order of preference (Stable -> Latest -> Fallback)
    const modelsToTry = [
        "gemini-2.0-flash", // Try 2.0 first
        "gemini-1.5-flash", 
        "gemini-1.5-flash-latest",
        "gemini-1.0-pro"
    ];

    let lastError;

    for (const modelName of modelsToTry) {
        try {
            console.log(`Attempting analysis with model: ${modelName}`);
            const response = await ai.models.generateContent({
                model: modelName,
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0.2
                }
            });

            const jsonText = response.text;
            if (!jsonText) throw new Error("No response from AI");
            
            return JSON.parse(jsonText) as LinguisticAnalysis & { translation: string };

        } catch (e: any) {
            console.warn(`Model ${modelName} failed:`, e.message || e);
            lastError = e;
            
            // If it's not a 404 (Not Found) or 400 (Bad Request), it might be a quota/server issue
            // but we'll try the next model anyway just in case.
            // Specifically check for "not found" in error message
            const isNotFound = e.message?.includes("not found") || e.message?.includes("404");
            if (!isNotFound) {
                // If it's a different error (e.g. Quota), maybe we shouldn't spam other models?
                // But let's be safe and try the next one if it's a specific model issue.
            }
        }
    }

    throw lastError || new Error("All models failed");

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Re-throw the error so the UI knows it failed and doesn't save an empty state.
    // This allows the system to retry analysis later.
    throw error;
  }
};