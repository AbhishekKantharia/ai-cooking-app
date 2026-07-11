import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import MealPlanResults from './components/MealPlanResults';
import { generateMealPlan } from './services/aiService';
import './App.css'; // Vite defaults, we'll keep it or clear it. Using index.css for global.

function App() {
  const [mealData, setMealData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async (userInput) => {
    setIsLoading(true);
    try {
      const result = await generateMealPlan(userInput);
      setMealData(result);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      alert("Failed to generate meal plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>AI Meal Planner</h1>
        <p style={{ fontSize: '1.2rem', color: '#576574' }}>Personalized daily menus, grocery lists, and budget analysis.</p>
      </div>
      
      <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
      
      {mealData && <MealPlanResults data={mealData} />}
    </div>
  );
}

export default App;
