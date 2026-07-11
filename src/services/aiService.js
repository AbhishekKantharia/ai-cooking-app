// Simulated AI service
export const generateMealPlan = async (userInput) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real app, we'd send userInput to Gemini API and parse the response
  // Here we return a mock response that matches the expected structure.
  
  return {
    meals: [
      {
        type: 'Breakfast',
        name: 'Avocado Toast with Egg',
        description: 'Quick and nutritious to start your busy day.',
        time: '10 mins'
      },
      {
        type: 'Lunch',
        name: 'Quinoa Salad Bowl',
        description: 'Light lunch to avoid the afternoon slump.',
        time: '15 mins'
      },
      {
        type: 'Dinner',
        name: 'Sheet Pan Lemon Herb Chicken',
        description: 'Easy cleanup and minimal active cooking time.',
        time: '35 mins'
      }
    ],
    groceryList: [
      { item: 'Avocado', amount: '2', category: 'Produce', price: 3.00 },
      { item: 'Eggs', amount: '1 dozen', category: 'Dairy/Eggs', price: 4.50 },
      { item: 'Whole wheat bread', amount: '1 loaf', category: 'Bakery', price: 3.50 },
      { item: 'Quinoa', amount: '1 bag', category: 'Pantry', price: 5.00 },
      { item: 'Mixed greens', amount: '1 box', category: 'Produce', price: 4.00 },
      { item: 'Chicken breast', amount: '1 lb', category: 'Meat', price: 7.00 },
      { item: 'Lemons', amount: '2', category: 'Produce', price: 1.50 }
    ],
    substitutions: [
      { original: 'Eggs', swap: 'Tofu scramble (if vegan)' },
      { original: 'Chicken', swap: 'Chickpeas or Paneer (if vegetarian)' }
    ],
    budgetAnalysis: {
      totalEstimatedCost: 28.50,
      isFeasible: userInput.budget ? 28.50 <= parseFloat(userInput.budget) : true,
      message: 'This plan is budget-friendly as it utilizes overlapping ingredients like olive oil and spices from your pantry.'
    }
  };
};
