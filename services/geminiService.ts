import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseVoiceOrder = async (audioBase64: string): Promise<any[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-native-audio-preview-12-2025",
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: "audio/wav", 
                            data: audioBase64
                        }
                    },
                    {
                        text: `
                        You are a Point of Sale assistant for "Pepe Betos", a Mexican restaurant. The menu is in English.
                        
                        Listen to the audio order (which might be in English, Spanish, or Spanglish) and extract the items.
                        Map the user's speech to the closest English menu items.
                        
                        Examples:
                        - "Tres tacos de asada" -> "Carne Asada Taco" (Quantity: 3)
                        - "A coke and a burger" -> "Mexican Coke", "Pepe's Burger"
                        - "Dos micheladas" -> "Michelada" (Quantity: 2)
                        
                        Return a JSON Array of objects with this schema:
                        {
                            "name": string (approximate menu item name in English),
                            "quantity": number,
                            "notes": string (optional modifications),
                            "targetSeat": string (optional, e.g. 'seat-1' if mentioned)
                        }
                        `
                    }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            quantity: { type: Type.NUMBER },
                            notes: { type: Type.STRING },
                            targetSeat: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) return [];
        return JSON.parse(text);

    } catch (error) {
        console.error("Gemini Voice Order Error:", error);
        return [];
    }
};