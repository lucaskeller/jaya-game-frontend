import { useState } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isAnswerRevealed: boolean
}

export const QuestionCard = ({ question, onAnswer, isAnswerRevealed }: QuestionCardProps) => {
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
          // Check if the option is the correct answer
          const isCorrect = option === question.correctAnswer;
          const isSelected = selectedOption === option;
          const baseClasses = "w-full py-2 px-4 rounded-lg text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75";
          
          // Determine button classes
          let buttonClasses = baseClasses;

          if (isAnswerRevealed) {
            if (isCorrect) {
              buttonClasses += " bg-green-500 animate-pulse"; // Option is correct (green with pulse)
            } else if (isSelected) {
              buttonClasses += " bg-red-500"; // Selected option is incorrect (red)
            } else {
              buttonClasses += " bg-gray-500"; // Unselected option remains gray
            }
          } else {
            // Default styles before answer is revealed
            buttonClasses += isSelected ? " bg-blue-600" : " bg-blue-500";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={buttonClasses}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
};
