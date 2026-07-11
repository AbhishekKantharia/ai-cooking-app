import React, { useState } from 'react';
import { ChefHat, DollarSign, Clock } from 'lucide-react';

const UserInputForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    dayDescription: '',
    budget: '',
    dietaryPrefs: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel">
      <h2>Plan Your Day's Meals</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label><Clock size={16} style={{marginRight: '8px', verticalAlign: 'text-bottom'}} />How's your day looking?</label>
          <textarea 
            name="dayDescription"
            value={formData.dayDescription}
            onChange={handleChange}
            placeholder="e.g., Working from home, have 30 mins for lunch, busy evening..."
            rows="3"
            required
          />
        </div>
        
        <div className="input-group">
          <label><DollarSign size={16} style={{marginRight: '8px', verticalAlign: 'text-bottom'}} />Daily Budget ($)</label>
          <input 
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g., 30"
          />
        </div>

        <div className="input-group">
          <label><ChefHat size={16} style={{marginRight: '8px', verticalAlign: 'text-bottom'}} />Dietary Preferences / Restrictions</label>
          <input 
            type="text"
            name="dietaryPrefs"
            value={formData.dietaryPrefs}
            onChange={handleChange}
            placeholder="e.g., Vegetarian, no dairy, low carb..."
          />
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}>
          {isLoading ? 'Generating Plan...' : 'Generate Meal Plan'}
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;
