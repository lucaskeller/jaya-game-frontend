import {describe, expect, it, vi} from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FinishButton } from './FinishButton';

describe('FinishButton', () => {
  it('renders the button with the correct text', () => {
    render(<FinishButton onClick={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('finish game');
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = vi.fn();
    render(<FinishButton onClick={onClickMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('has the correct styles', () => {
    render(<FinishButton onClick={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600');
  });
});
