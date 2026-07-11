import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import MealPlanResults from './components/MealPlanResults';
import { generateMealPlan } from './services/aiService';

function App() {
  const [mealData, setMealData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePlan = async (userInput) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await generateMealPlan(userInput);
      setMealData(result);
    } catch (err) {
      console.error("Error generating meal plan:", err);
      setError(err.message || "Failed to generate meal plan. Please try again.");
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

      {error && (
        <div className="glass-panel error-banner" style={{ marginBottom: '20px', padding: '15px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
      
      {mealData && <MealPlanResults data={mealData} />}
    </div>
  );
}

export default App;
