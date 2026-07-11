import { describe, it, expect } from 'vitest';

const validateMealData = (data) => {
  if (!data || typeof data !== 'object') throw new Error('Invalid response format from AI.');
  const required = ['meals', 'groceryList', 'substitutions', 'budgetAnalysis'];
  for (const key of required) {
    if (!data[key]) throw new Error(`Missing required field: ${key}`);
  }
  if (!Array.isArray(data.meals) || data.meals.length === 0) throw new Error('No meals were generated. Please try again.');
  if (!Array.isArray(data.groceryList)) throw new Error('Invalid grocery list data.');
  if (!Array.isArray(data.substitutions)) throw new Error('Invalid substitutions data.');
  if (!data.budgetAnalysis || typeof data.budgetAnalysis.totalEstimatedCost !== 'number') {
    throw new Error('Invalid budget analysis data.');
  }
  return data;
};

const validData = {
  meals: [{ type: 'Breakfast', name: 'Oatmeal', description: 'Healthy', time: '8:00 AM' }],
  groceryList: [{ item: 'Oats', amount: '500g', category: 'Grains', price: 3.99 }],
  substitutions: [{ original: 'Milk', swap: 'Almond Milk' }],
  budgetAnalysis: { totalEstimatedCost: 10.0, isFeasible: true, message: 'On track' },
};

describe('validateMealData', () => {
  it('returns data unchanged when valid', () => {
    const result = validateMealData(validData);
    expect(result).toEqual(validData);
  });

  it('throws on null input', () => {
    expect(() => validateMealData(null)).toThrow('Invalid response format from AI.');
  });

  it('throws on undefined input', () => {
    expect(() => validateMealData(undefined)).toThrow('Invalid response format from AI.');
  });

  it('throws on non-object input', () => {
    expect(() => validateMealData('string')).toThrow('Invalid response format from AI.');
  });

  it('throws when meals is missing', () => {
    const data = { ...validData, meals: undefined };
    expect(() => validateMealData(data)).toThrow('Missing required field: meals');
  });

  it('throws when groceryList is missing', () => {
    const data = { ...validData, groceryList: undefined };
    expect(() => validateMealData(data)).toThrow('Missing required field: groceryList');
  });

  it('throws when substitutions is missing', () => {
    const data = { ...validData, substitutions: undefined };
    expect(() => validateMealData(data)).toThrow('Missing required field: substitutions');
  });

  it('throws when budgetAnalysis is missing', () => {
    const data = { ...validData, budgetAnalysis: undefined };
    expect(() => validateMealData(data)).toThrow('Missing required field: budgetAnalysis');
  });

  it('throws when meals array is empty', () => {
    const data = { ...validData, meals: [] };
    expect(() => validateMealData(data)).toThrow('No meals were generated.');
  });

  it('throws when meals is not an array', () => {
    const data = { ...validData, meals: 'not an array' };
    expect(() => validateMealData(data)).toThrow('No meals were generated.');
  });

  it('throws when groceryList is not an array', () => {
    const data = { ...validData, groceryList: 'not an array' };
    expect(() => validateMealData(data)).toThrow('Invalid grocery list data.');
  });

  it('throws when substitutions is not an array', () => {
    const data = { ...validData, substitutions: 'not an array' };
    expect(() => validateMealData(data)).toThrow('Invalid substitutions data.');
  });

  it('throws when budgetAnalysis.totalEstimatedCost is not a number', () => {
    const data = { ...validData, budgetAnalysis: { ...validData.budgetAnalysis, totalEstimatedCost: 'ten' } };
    expect(() => validateMealData(data)).toThrow('Invalid budget analysis data.');
  });

  it('accepts meals with multiple entries', () => {
    const data = {
      ...validData,
      meals: [
        { type: 'Breakfast', name: 'Oatmeal', description: 'Healthy', time: '8:00 AM' },
        { type: 'Lunch', name: 'Salad', description: 'Fresh', time: '12:30 PM' },
      ],
    };
    expect(() => validateMealData(data)).not.toThrow();
  });

  it('accepts empty arrays for groceryList and substitutions', () => {
    const data = { ...validData, groceryList: [], substitutions: [] };
    expect(() => validateMealData(data)).not.toThrow();
  });
});
