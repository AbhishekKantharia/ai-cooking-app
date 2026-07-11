import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import MealPlanResults from './components/MealPlanResults';
import { generateMealPlan } from './services/aiService';

function App() {
  const [mealData, setMealData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [error, setError] = useState('');

  const handleApiKeyChange = (e) => {
    const val = e.target.value;
    setApiKey(val);
    localStorage.setItem('gemini_api_key', val);
    if (error) setError('');
  };

  const handleGeneratePlan = async (userInput) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await generateMealPlan(userInput, apiKey);
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

      <div className="glass-panel" style={{ marginBottom: '20px', padding: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Gemini API Key</label>
        <input 
          type="password" 
          value={apiKey} 
          onChange={handleApiKeyChange} 
          placeholder="Enter your Gemini API key (saved locally in browser)"
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #dcdde1' }}
        />
        <small style={{ color: '#576574', marginTop: '5px', display: 'block' }}>
          Your key is saved in your browser's local storage and never sent anywhere else.
        </small>
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
