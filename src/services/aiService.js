import { GoogleGenerativeAI, SchemaType as Type } from "@google/generative-ai";

const validateMealData = (data) => {
  if (!data || typeof data !== "object") throw new Error("Invalid response format from AI.");
  const required = ["meals", "groceryList", "substitutions", "budgetAnalysis"];
  for (const key of required) {
    if (!data[key]) throw new Error(`Missing required field: ${key}`);
  }
  if (!Array.isArray(data.meals) || data.meals.length === 0) throw new Error("No meals were generated. Please try again.");
  if (!Array.isArray(data.groceryList)) throw new Error("Invalid grocery list data.");
  if (!Array.isArray(data.substitutions)) throw new Error("Invalid substitutions data.");
  if (!data.budgetAnalysis || typeof data.budgetAnalysis.totalEstimatedCost !== "number") {
    throw new Error("Invalid budget analysis data.");
  }
  return data;
};

export const generateMealPlan = async (userInput) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error("Missing Gemini API Key. Set VITE_GEMINI_API_KEY in your .env file.");
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

  let result;
  try {
    result = await model.generateContent(prompt);
  } catch (err) {
    if (err.message?.includes("API key")) {
      throw new Error("Invalid API key. Please check your Gemini API key and try again.");
    }
    throw new Error(`Gemini API error: ${err.message || "Unknown error. Please try again."}`);
  }

  const text = result.response.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Failed to parse AI response. Please try again.");
  }

  return validateMealData(parsed);
};
