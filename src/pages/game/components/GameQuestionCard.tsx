import { QuestionCard } from "../../../components/QuestionCard";
import { Question } from "../../../types";
import Skeleton from "react-loading-skeleton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import 'react-loading-skeleton/dist/skeleton.css';

interface GameQuestionCardProps {
  currentQuestion: Question;
  loading: boolean;
  answer: string | null;
  onAnswer: (answer: string) => void;
  isAnswerRevealed: boolean;
}

export const GameQuestionCard = ({
  currentQuestion,
  loading,
  answer,
  onAnswer,
  isAnswerRevealed,
}: GameQuestionCardProps) => {
  return (
    <div className="game-question-card-container">
      <TransitionGroup>
        {loading ? (
          <CSSTransition key="loading" timeout={300} classNames="slide-left">
            <div className="transition-wrapper">
              <Skeleton height={64} count={1} />
              <Skeleton height={40} count={4} />
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition key="question" timeout={300} classNames="slide-left">
            <div className="transition-wrapper">
              <QuestionCard
                question={currentQuestion}
                onAnswer={onAnswer}
                answered={!!answer}
                isAnswerRevealed={isAnswerRevealed}
              />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
