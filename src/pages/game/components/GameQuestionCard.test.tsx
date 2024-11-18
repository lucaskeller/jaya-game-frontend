import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GameQuestionCard } from './GameQuestionCard';
import { Question } from "../../../types";

describe('GameQuestionCard', () => {
  const mockOnAnswer = vi.fn();
  const currentQuestion: Question = {
    id: 1,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  };

  it('renders skeleton loading state when loading is true', () => {
    render(
      <GameQuestionCard
        currentQuestion={currentQuestion}
        loading={true}
        answer={null}
        onAnswer={mockOnAnswer}
        isAnswerRevealed={false}
      />
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders the question card when loading is false', () => {
    render(
      <GameQuestionCard
        currentQuestion={currentQuestion}
        loading={false}
        answer={null}
        onAnswer={mockOnAnswer}
        isAnswerRevealed={false}
      />
    );
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });

  it('calls onAnswer function when an answer is selected', () => {
    render(
      <GameQuestionCard
        currentQuestion={currentQuestion}
        loading={false}
        answer={null}
        onAnswer={mockOnAnswer}
        isAnswerRevealed={false}
      />
    );

    // Simulate answering the question
    fireEvent.click(screen.getByText("4"));
    expect(mockOnAnswer).toHaveBeenCalledWith("4");
  });

  it('displays answer if isAnswerRevealed is true', () => {
    render(
      <GameQuestionCard
        currentQuestion={currentQuestion}
        loading={false}
        answer="4"
        onAnswer={mockOnAnswer}
        isAnswerRevealed={true}
      />
    );
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
