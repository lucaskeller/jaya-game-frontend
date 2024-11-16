import { createContext, useState, useContext } from 'react';

interface GameState {
  score: number;
  questions: Question[];
  currentQuestionIndex: number;
  totalQuestions: number;
  setScore: (score: number) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

import { ReactNode } from 'react';
import { Question } from '../types';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const totalQuestions = 10;

  return (
    <GameContext.Provider
      value={{ 
        totalQuestions, 
        score, 
        questions, 
        setQuestions, 
        currentQuestionIndex, 
        setCurrentQuestionIndex, 
        setScore,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
