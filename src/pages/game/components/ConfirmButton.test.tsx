import {describe, expect, it, vi} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {ConfirmButton} from './ConfirmButton';

describe('ConfirmButton', () => {
  it('should apply hover styles when not disabled', () => {
    // Render the ConfirmButton with disabled = false
    render(<ConfirmButton onClick={vi.fn()} disabled={false} />);

    // Get all buttons with the role "button" and name "Confirm"
    const buttons = screen.getAllByRole('button', { name: 'Confirm' });

    // Filter out the disabled button(s)
    const enabledButton = buttons.find(button => !(button as HTMLButtonElement).disabled);

    // Assert that the enabled button has the correct hover styles
    expect(enabledButton).toHaveClass('hover:bg-green-600');
  });

  it('should not apply hover styles when disabled', () => {
    // Render the ConfirmButton with disabled = true
    render(<ConfirmButton onClick={vi.fn()} disabled={true} />);

    // Get all buttons with the role "button" and name "Confirm"
    const buttons = screen.getAllByRole('button', { name: 'Confirm' });

    // Filter out the disabled button(s)
    const disabledButton = buttons.find(button => (button as HTMLButtonElement).disabled);

    // Assert that the disabled button does not have hover styles
    expect(disabledButton).not.toHaveClass('hover:bg-green-600');
  });

  it('should trigger onClick when clicked and not disabled', () => {
    // Create a mock function for onClick
    const handleClick = vi.fn();

    // Render the ConfirmButton with disabled = false
    render(<ConfirmButton onClick={handleClick} disabled={false} />);

    // Get the enabled button
    const button = screen.getByRole('button', { name: 'Confirm' });

    // Simulate a click event on the button
    fireEvent.click(button);

    // Assert that the onClick handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger onClick when clicked and disabled', () => {
    // Create a mock function for onClick
    const handleClick = vi.fn();

    // Render the ConfirmButton with disabled = true
    render(<ConfirmButton onClick={handleClick} disabled={true} />);

    // Get the disabled button
    const button = screen.getByRole('button', { name: 'Confirm' });

    // Simulate a click event on the button
    fireEvent.click(button);

    // Assert that the onClick handler was not called
    expect(handleClick).not.toHaveBeenCalled();
  });
});
