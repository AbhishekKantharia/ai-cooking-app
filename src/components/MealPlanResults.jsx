import React, { useState } from 'react';
import { Utensils, ShoppingCart, Repeat, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

const tabs = [
  { id: 'plan', label: 'Meal Plan', Icon: Utensils },
  { id: 'grocery', label: 'Grocery List', Icon: ShoppingCart },
  { id: 'subs', label: 'Substitutions', Icon: Repeat },
  { id: 'budget', label: 'Budget', Icon: DollarSign },
];

const MealPlanResults = ({ data }) => {
  const [activeTab, setActiveTab] = useState('plan');

  if (!data) return null;

  return (
    <div className="glass-panel results-container">
      <div className="tab-bar" role="tablist">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`panel-${id}`}
            className={`tab-button ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="tab-panels">
        {activeTab === 'plan' && (
          <div id="panel-plan" role="tabpanel">
            {data.meals.map((meal, index) => (
              <div key={index} className="meal-card">
                <h3>{meal.type}: {meal.name}</h3>
                <p style={{ margin: '8px 0', color: '#576574' }}>{meal.description}</p>
                <small style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>{meal.time}</small>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'grocery' && (
          <div id="panel-grocery" role="tabpanel" className="meal-card">
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
          <div id="panel-subs" role="tabpanel" className="meal-card">
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
          <div id="panel-budget" role="tabpanel" className="meal-card">
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
