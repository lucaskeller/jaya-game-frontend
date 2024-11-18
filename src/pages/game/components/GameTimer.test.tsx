import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameTimer } from './GameTimer';
import { Question } from '../../../types';

vi.mock('../../../components/Timer', () => ({
  Timer: vi.fn(() => <div>Mock Timer</div>),
}));

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('GameTimer', () => {
  const mockHandleTimeUp = vi.fn();

  const defaultProps = {
    currentQuestion: { id: 1, text: 'What is 2 + 2?' } as Question,
    loading: false,
    answer: null,
    handleTimeUp: mockHandleTimeUp,
    timerStarted: true,
  };

  it('should render Timer when conditions are met', () => {
    render(<GameTimer {...defaultProps} />);

    // Check if Timer component is rendered
    expect(screen.getByText('Mock Timer')).toBeInTheDocument();
  });

  it('should render a placeholder div when loading is true', () => {
    render(<GameTimer {...{ ...defaultProps, loading: true }} />);

    // Check if the placeholder div is rendered
    expect(screen.getByTestId('empty-progresbar')).toBeInTheDocument();
  });

  it('should render a placeholder div when answer is provided', () => {
    render(<GameTimer {...{ ...defaultProps, answer: true }} />);

    // Check if the placeholder div is rendered
    expect(screen.getByTestId('empty-progresbar')).toBeInTheDocument();
  });
  
  // it('should call handleTimeUp when time is up', async () => {
  //   render(<GameTimer {...defaultProps} />);
  
  //   act(() => vi.advanceTimersByTime(6000));
  
  //   expect(mockHandleTimeUp).toHaveBeenCalledTimes(1);
  // });
  
});
