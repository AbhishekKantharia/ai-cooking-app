import React, { useState } from 'react';
import { Utensils, ShoppingCart, Repeat, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

const MealPlanResults = ({ data }) => {
  const [activeTab, setActiveTab] = useState('plan');

  if (!data) return null;

  return (
    <div className="glass-panel results-container">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #dcdde1', paddingBottom: '10px' }}>
        <button 
          style={{ background: activeTab === 'plan' ? 'var(--primary-color)' : '#dcdde1', color: activeTab === 'plan' ? 'white' : '#2f3640' }}
          onClick={() => setActiveTab('plan')}
        >
          <Utensils size={16} style={{marginRight: '6px', verticalAlign: 'text-bottom'}} /> Meal Plan
        </button>
        <button 
          style={{ background: activeTab === 'grocery' ? 'var(--primary-color)' : '#dcdde1', color: activeTab === 'grocery' ? 'white' : '#2f3640' }}
          onClick={() => setActiveTab('grocery')}
        >
          <ShoppingCart size={16} style={{marginRight: '6px', verticalAlign: 'text-bottom'}} /> Grocery List
        </button>
        <button 
          style={{ background: activeTab === 'subs' ? 'var(--primary-color)' : '#dcdde1', color: activeTab === 'subs' ? 'white' : '#2f3640' }}
          onClick={() => setActiveTab('subs')}
        >
          <Repeat size={16} style={{marginRight: '6px', verticalAlign: 'text-bottom'}} /> Substitutions
        </button>
        <button 
          style={{ background: activeTab === 'budget' ? 'var(--primary-color)' : '#dcdde1', color: activeTab === 'budget' ? 'white' : '#2f3640' }}
          onClick={() => setActiveTab('budget')}
        >
          <DollarSign size={16} style={{marginRight: '6px', verticalAlign: 'text-bottom'}} /> Budget
        </button>
      </div>

      <div>
        {activeTab === 'plan' && (
          <div>
            {data.meals.map((meal, index) => (
              <div key={index} className="meal-card">
                <h3>{meal.type}: {meal.name}</h3>
                <p style={{ margin: '8px 0', color: '#576574' }}>{meal.description}</p>
                <small style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>⏱ {meal.time}</small>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'grocery' && (
          <div className="meal-card">
            <h3>Grocery List</h3>
            <ul className="ingredients-list">
              {data.groceryList.map((item, index) => (
                <li key={index}>
                  <span><strong>{item.item}</strong> ({item.amount}) - <small>{item.category}</small></span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'subs' && (
          <div className="meal-card">
            <h3>Suggested Substitutions</h3>
            <ul className="ingredients-list">
              {data.substitutions.map((sub, index) => (
                <li key={index}>
                  <span>Swap <strong>{sub.original}</strong> for <strong>{sub.swap}</strong></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="meal-card">
            <h3>Budget Analysis</h3>
            <div className={`budget-alert ${data.budgetAnalysis.isFeasible ? 'success' : 'warning'}`}>
              {data.budgetAnalysis.isFeasible ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
              <span>
                <strong>Total Estimated Cost: ${data.budgetAnalysis.totalEstimatedCost.toFixed(2)}</strong>
                <br/>
                {data.budgetAnalysis.message}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanResults;
