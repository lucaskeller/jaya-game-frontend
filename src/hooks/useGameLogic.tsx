import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { Question } from '../types';
import { fetchQuestion } from '../utils/openai';
import axiosInstance from '../utils/axiosInstance';

export const useGameLogic = () => {
  const { 
    score, 
    setScore, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    questions, 
    totalQuestions, 
    setQuestions, 
    currentUser 
  } = useGameContext();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [timeUp, setTimeup] = useState<boolean>(false);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  const navigate = useNavigate();

  // function for question load from openai
  const loadQuestion = async () => {
    setLoading(true);

    if (!questions[currentQuestionIndex]) {
      const question = await fetchQuestion();
      setCurrentQuestion(question);
      setQuestions([...questions, question]);
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
    setTimerStarted(true);
    setLoading(false);
  };

  // function called on time up
  //
  // fix: Cannot update a component while rendering a different component
  // when we wrap the state update inside setTimeout, it schedules the update 
  // to run after the current render is finished, making it asynchronous relative 
  // to the current rendering process. This ensures React’s rendering flow is 
  // not disrupted
  const handleTimeUp = () => {
    setTimeout(() => {
      setTimerStarted(false);
      setIsAnswerRevealed(true);
      handleAnswer();
      setTimeup(true);
    }, 0);
  };

  // function to handle opaenai answer
  const handleAnswer = () => {
    if (answer === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswerRevealed(true);
    handleNextQuestion();
  };

  // function to handle next question
  const handleNextQuestion = () => {
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex <= totalQuestions) {
        setCurrentQuestionIndex(nextIndex);
        setTimeup(false);
        setIsAnswerRevealed(false);
        setAnswer(null);
      } else {
        handleFinishGame();
      }
    }, 5000);
  };

  // function to finish the game
  const handleFinishGame = async () => {
    await axiosInstance.post('/games', {
      data: {
        game_user: {
          connect: currentUser.id,
        },
        score: score,
      },
    });
    navigate('/results');
  };

  const checkIfUserIsLogged = () => {
    if (currentUser === null) {
      navigate('/');
    }
  };

  useEffect(() => {
    checkIfUserIsLogged();
    loadQuestion();
  }, [currentQuestionIndex]);

  return {
    currentQuestion,
    loading,
    answer,
    isAnswerRevealed,
    timeUp,
    timerStarted,
    onAnswer: setAnswer,
    handleTimeUp,
    handleAnswer,
    handleNextQuestion,
    handleFinishGame,
  };
};
