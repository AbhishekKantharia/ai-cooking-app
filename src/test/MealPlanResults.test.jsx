import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import MealPlanResults from '../components/MealPlanResults';

const mockData = {
  meals: [
    { type: 'Breakfast', name: 'Oatmeal', description: 'Healthy oatmeal with berries', time: '8:00 AM' },
    { type: 'Lunch', name: 'Salad', description: 'Fresh garden salad', time: '12:30 PM' },
    { type: 'Dinner', name: 'Pasta', description: 'Homemade pasta with marinara', time: '7:00 PM' },
  ],
  groceryList: [
    { item: 'Oats', amount: '500g', category: 'Grains', price: 3.99 },
    { item: 'Mixed Berries', amount: '200g', category: 'Produce', price: 5.49 },
    { item: 'Pasta', amount: '500g', category: 'Grains', price: 2.29 },
  ],
  substitutions: [
    { original: 'Dairy Milk', swap: 'Almond Milk' },
    { original: 'All-purpose flour', swap: 'Whole wheat flour' },
  ],
  budgetAnalysis: {
    totalEstimatedCost: 24.50,
    isFeasible: true,
    message: 'Within budget. Great choices!',
  },
};

describe('MealPlanResults', () => {
  it('returns null when data is null', () => {
    const { container } = render(<MealPlanResults data={null} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders all tab buttons', () => {
    render(<MealPlanResults data={mockData} />);

    expect(screen.getByRole('tab', { name: /meal plan/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /grocery list/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /substitutions/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /budget/i })).toBeInTheDocument();
  });

  it('displays meal plan tab by default', () => {
    render(<MealPlanResults data={mockData} />);

    expect(screen.getByText(/Breakfast: Oatmeal/)).toBeInTheDocument();
    expect(screen.getByText(/Lunch: Salad/)).toBeInTheDocument();
    expect(screen.getByText(/Dinner: Pasta/)).toBeInTheDocument();
  });

  it('switches to grocery list tab on click', async () => {
    const user = userEvent.setup();
    render(<MealPlanResults data={mockData} />);

    await user.click(screen.getByRole('tab', { name: /grocery list/i }));

    const panel = document.getElementById('panel-grocery');
    expect(panel).toBeInTheDocument();
    expect(screen.getByText('Oats')).toBeInTheDocument();
    expect(screen.getByText('Mixed Berries')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  it('displays prices in grocery list', async () => {
    const user = userEvent.setup();
    render(<MealPlanResults data={mockData} />);

    await user.click(screen.getByRole('tab', { name: /grocery list/i }));

    expect(screen.getByText('$3.99')).toBeInTheDocument();
    expect(screen.getByText('$5.49')).toBeInTheDocument();
    expect(screen.getByText('$2.29')).toBeInTheDocument();
  });

  it('switches to substitutions tab on click', async () => {
    const user = userEvent.setup();
    render(<MealPlanResults data={mockData} />);

    await user.click(screen.getByRole('tab', { name: /substitutions/i }));

    expect(screen.getByText(/Dairy Milk/)).toBeInTheDocument();
    expect(screen.getByText(/Almond Milk/)).toBeInTheDocument();
    expect(screen.getByText(/All-purpose flour/)).toBeInTheDocument();
    expect(screen.getByText(/Whole wheat flour/)).toBeInTheDocument();
  });

  it('switches to budget tab on click', async () => {
    const user = userEvent.setup();
    render(<MealPlanResults data={mockData} />);

    await user.click(screen.getByRole('tab', { name: /budget/i }));

    expect(screen.getByText('Budget Analysis')).toBeInTheDocument();
    expect(screen.getByText(/\$24\.50/)).toBeInTheDocument();
    expect(screen.getByText(/Within budget/)).toBeInTheDocument();
  });

  it('shows feasible budget as success', async () => {
    const user = userEvent.setup();
    render(<MealPlanResults data={mockData} />);

    await user.click(screen.getByRole('tab', { name: /budget/i }));

    const alert = screen.getByText(/Within budget/).closest('.budget-alert');
    expect(alert).toHaveClass('success');
  });

  it('shows infeasible budget as warning', async () => {
    const user = userEvent.setup();
    const overBudgetData = {
      ...mockData,
      budgetAnalysis: { totalEstimatedCost: 75.00, isFeasible: false, message: 'Over budget!' },
    };
    render(<MealPlanResults data={overBudgetData} />);

    await user.click(screen.getByRole('tab', { name: /budget/i }));

    const alert = screen.getByText(/Over budget!/).closest('.budget-alert');
    expect(alert).toHaveClass('warning');
  });

  it('marks the active tab with aria-selected', () => {
    render(<MealPlanResults data={mockData} />);

    expect(screen.getByRole('tab', { name: /meal plan/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /grocery list/i })).toHaveAttribute('aria-selected', 'false');
  });
});
