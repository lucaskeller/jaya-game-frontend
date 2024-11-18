import { useState } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isAnswerRevealed: boolean,
  answered: boolean;
}

export const QuestionCard = ({ question, onAnswer, isAnswerRevealed, answered }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = selectedOption === option;
          const baseClasses = "w-full py-2 px-4 rounded-lg text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75";
          
          let buttonClasses = baseClasses;

          if (isAnswerRevealed) {
            if (isCorrect) {
              buttonClasses += " bg-green-500 animate-pulse";
            } else if (isSelected) {
              buttonClasses += " bg-red-500";
            } else {
              buttonClasses += " bg-gray-500";
            }
          } else {
            buttonClasses += isSelected ? " bg-yellow-600" : " bg-blue-500";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={buttonClasses}
              disabled={isAnswerRevealed || answered}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
};
