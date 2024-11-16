import { useEffect, useState } from 'react';
import { useGameContext } from '../../context/GameContext';
import { Question } from '../../types';
import { fetchQuestion } from '../../utils/openai';
import { QuestionCard } from '../../components/QuestionCard';
import ProgressBar from '../../components/ProgressBAr';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
// import { Timer } from '../../components/timer';

export const Game = () => {
  const { score, setScore, currentQuestionIndex, setCurrentQuestionIndex, questions, totalQuestions, setQuestions, currentUser } = useGameContext();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [timeUp, setTimeup] = useState(false);
  const navigate = useNavigate();

  const loadQuestion = async () => {
    setLoading(true);

    if (!questions[currentQuestionIndex]) {
      const question = await fetchQuestion();
      setCurrentQuestion(question);
      
      setQuestions([...questions, question]);
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }

    setLoading(false);
  };

  const onAnswer = (answer: string) => {
    setAnswer(answer);
  }

  const handleTimeUp = () => {
    setIsAnswerRevealed(true);
    handleAnswer();
    setTimeup(true);
    handleNextQuestion()
  }

  const handleFinishGame = async () => {
    await axiosInstance.post('/games', {
      data: {
        game_user: {
          connect: currentUser.id,
        },
        score: score,
      }
    });

    navigate('/results');
  }

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswerRevealed(false);
      setAnswer(null);
    } else {
      handleFinishGame();
    }
  }

  const handleAnswer = () => {
    if (answer === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }

    setIsAnswerRevealed(true)

    setTimeout(() => {
      handleNextQuestion();
    }, 5000);
  };

  const checkIfUserIsLogged = () => {
    if (currentUser === null) {
      navigate('/');
    }
  }

  useEffect(() => {
    checkIfUserIsLogged();
    loadQuestion();
  }, [currentQuestionIndex]);

  return (
    <div>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-stretch">
          {/* Título */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Question {currentQuestionIndex}
          </h1>

          <button
            disabled={answer === null}
            className={`px-4 py-2 bg-green-500 text-white rounded ${answer === null ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-600'}`}
            onClick={() => handleAnswer()}
          >
            Confirm
          </button>
        </div>
      </div>
    </header>
      <main className='p-5'>
      <button
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600`}
            onClick={() => handleFinishGame()}
          >
            finish game
          </button>
        {/* {currentQuestion && <Timer duration={5} onTimeUp={() => handleTimeUp()} />} */}
        {currentQuestion && !loading && <QuestionCard question={currentQuestion} onAnswer={onAnswer} isAnswerRevealed={isAnswerRevealed} />}
        {loading && <p>Loading...</p>}
        <ProgressBar />
        {isAnswerRevealed && answer === currentQuestion?.correctAnswer && (
          <p className='blinking-text correct'>Correct!</p>
        )}
        {isAnswerRevealed && !timeUp && answer !== currentQuestion?.correctAnswer && (
          <p className='blinking-text incorrect'>Incorrect!</p>
        )}
        {isAnswerRevealed && timeUp && (
          <p className='blinking-text incorrect'>Time is up!</p>
        )}
      </main>
    </div>
  );
};
