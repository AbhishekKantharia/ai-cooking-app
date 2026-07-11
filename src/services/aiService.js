import { GoogleGenerativeAI, SchemaType as Type } from "@google/generative-ai";

export const generateMealPlan = async (userInput, customApiKey) => {
  const API_KEY = customApiKey || import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error("Missing Gemini API Key. Please enter your API Key in the field at the top.");
  }
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                time: { type: Type.STRING }
              },
              required: ["type", "name", "description", "time"]
            }
          },
          groceryList: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                amount: { type: Type.STRING },
                category: { type: Type.STRING },
                price: { type: Type.NUMBER }
              },
              required: ["item", "amount", "category", "price"]
            }
          },
          substitutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                swap: { type: Type.STRING }
              },
              required: ["original", "swap"]
            }
          },
          budgetAnalysis: {
            type: Type.OBJECT,
            properties: {
              totalEstimatedCost: { type: Type.NUMBER },
              isFeasible: { type: Type.BOOLEAN },
              message: { type: Type.STRING }
            },
            required: ["totalEstimatedCost", "isFeasible", "message"]
          }
        },
        required: ["meals", "groceryList", "substitutions", "budgetAnalysis"]
      }
    }
  });

  const prompt = `Generate a personalized daily cooking to-do list based on the following:
  - Day description/Schedule: ${userInput.dayDescription}
  - Budget constraints: ${userInput.budget ? '$' + userInput.budget : 'No budget'}
  - Dietary preferences/restrictions: ${userInput.dietaryPrefs || 'None'}
  
  Please provide practical, realistic meal ideas (Breakfast, Lunch, Dinner) that fit the schedule. Ensure the grocery list is categorized and the prices are realistic estimates. Make sure the budget analysis reflects the provided constraints.`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
