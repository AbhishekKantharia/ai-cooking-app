import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UserInputForm from '../components/UserInputForm';

describe('UserInputForm', () => {
  it('renders all form fields and submit button', () => {
    render(<UserInputForm onSubmit={vi.fn()} isLoading={false} />);

    expect(screen.getByPlaceholderText(/working from home/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\., 30/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\., vegetarian/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate meal plan/i })).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(<UserInputForm onSubmit={vi.fn()} isLoading={true} />);

    expect(screen.getByRole('button', { name: /generating plan/i })).toBeDisabled();
  });

  it('updates textarea on user input', async () => {
    const user = userEvent.setup();
    render(<UserInputForm onSubmit={vi.fn()} isLoading={false} />);

    const textarea = screen.getByPlaceholderText(/working from home/i);
    await user.type(textarea, 'Working from home');

    expect(textarea).toHaveValue('Working from home');
  });

  it('updates budget input on user input', async () => {
    const user = userEvent.setup();
    render(<UserInputForm onSubmit={vi.fn()} isLoading={false} />);

    const budgetInput = screen.getByPlaceholderText(/e\.g\., 30/i);
    await user.type(budgetInput, '30');

    expect(budgetInput).toHaveValue(30);
  });

  it('updates dietary prefs input on user input', async () => {
    const user = userEvent.setup();
    render(<UserInputForm onSubmit={vi.fn()} isLoading={false} />);

    const dietaryInput = screen.getByPlaceholderText(/e\.g\., vegetarian/i);
    await user.type(dietaryInput, 'Vegetarian');

    expect(dietaryInput).toHaveValue('Vegetarian');
  });

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<UserInputForm onSubmit={onSubmit} isLoading={false} />);

    await user.type(screen.getByPlaceholderText(/working from home/i), 'Busy day');
    await user.type(screen.getByPlaceholderText(/e\.g\., 30/i), '25');
    await user.type(screen.getByPlaceholderText(/e\.g\., vegetarian/i), 'Vegan');
    await user.click(screen.getByRole('button', { name: /generate meal plan/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      dayDescription: 'Busy day',
      budget: '25',
      dietaryPrefs: 'Vegan',
    });
  });

  it('does not call onSubmit when required field is empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<UserInputForm onSubmit={onSubmit} isLoading={false} />);

    await user.click(screen.getByRole('button', { name: /generate meal plan/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits with empty optional fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<UserInputForm onSubmit={onSubmit} isLoading={false} />);

    await user.type(screen.getByPlaceholderText(/working from home/i), 'Chill day');
    await user.click(screen.getByRole('button', { name: /generate meal plan/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      dayDescription: 'Chill day',
      budget: '',
      dietaryPrefs: '',
    });
  });
});
