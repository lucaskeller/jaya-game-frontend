import { FeedbackMessage } from "../../components/FeedbackMessages";
import ProgressBar from "../../components/ProgressBar";
import { useGameContext } from "../../context/GameContext";
import { useGameLogic } from "../../hooks/useGameLogic";
import { ConfirmButton } from "./components/ConfirmButton";
// import { FinishButton } from "./components/FinishButton";
import { GameQuestionCard } from "./components/GameQuestionCard";
import { GameTimer } from "./components/GameTimer";

export const Game = () => {
  const {currentQuestionIndex, score} = useGameContext();

  const {
    currentQuestion,
    loading,
    answer,
    isAnswerRevealed,
    timeUp,
    timerStarted,
    onAnswer,
    handleTimeUp,
    handleAnswer,
    // handleFinishGame,
  } = useGameLogic();

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-stretch">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Question {currentQuestionIndex}</h1>
              <small>Score: {score}</small>
            </div>
            
            <ConfirmButton onClick={handleAnswer} disabled={answer === null} />
          </div>
          <ProgressBar />
        </div>
      </header>
      <main className='p-5'>
        {/* <FinishButton onClick={handleFinishGame} /> */}
        <GameTimer 
          currentQuestion={currentQuestion} 
          loading={loading} 
          answer={!!answer} 
          handleTimeUp={handleTimeUp} 
          timerStarted={timerStarted} 
        />
        <GameQuestionCard 
          currentQuestion={currentQuestion} 
          loading={loading} 
          answer={answer} 
          onAnswer={onAnswer} 
          isAnswerRevealed={isAnswerRevealed} 
        />
        <FeedbackMessage 
          isAnswerRevealed={isAnswerRevealed}
          answer={answer}
          correctAnswer={currentQuestion?.correctAnswer}
          timeUp={timeUp}
        />
      </main>
    </div>
  );
};
