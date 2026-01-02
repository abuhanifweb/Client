import { GoogleGenAI, Type } from "@google/genai";
import { AIEstimateResult, Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const estimatePowerLoad = async (description: string, language: Language = 'en'): Promise<AIEstimateResult> => {
  if (!apiKey) {
    throw new Error(language === 'pt' ? "Chave API em falta" : "API Key is missing");
  }

  const model = "gemini-3-flash-preview";
  
  const langInstruction = language === 'pt' 
    ? "Reply strictly in Portuguese." 
    : "Reply strictly in English.";

  const systemInstruction = `
    You are an expert electrical engineer at Powersil, a leading power generation company.
    Your task is to estimate the electrical load (in kVA) required for a user's described scenario or equipment list.
    Be conservative but realistic. Always add a 20% safety margin in your calculations.
    ${langInstruction}
    
    Return the result in JSON format with:
    - minKVA: number
    - maxKVA: number
    - reasoning: string (brief technical explanation in ${language === 'pt' ? 'Portuguese' : 'English'})
    - suggestedCategory: string (e.g., "Diesel Industrial", "Gas Home", "Portable" - translate category if needed)
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: description,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            minKVA: { type: Type.NUMBER },
            maxKVA: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            suggestedCategory: { type: Type.STRING },
          },
          required: ["minKVA", "maxKVA", "reasoning", "suggestedCategory"],
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIEstimateResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(language === 'pt' 
      ? "Falha ao estimar carga. Por favor use a calculadora manual." 
      : "Failed to estimate load. Please try the manual calculator."
    );
  }
};