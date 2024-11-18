import { Timer } from "../../../components/Timer";
import { Question } from "../../../types";

interface GameTimerProps {
  currentQuestion: Question;
  loading: boolean;
  answer: boolean | null;
  handleTimeUp: () => void;
  timerStarted: boolean;
}

export const GameTimer = ({ currentQuestion, loading, answer, handleTimeUp, timerStarted }: GameTimerProps) => {
  if (currentQuestion && !loading && !answer) {
    return <Timer duration={5} onTimeUp={handleTimeUp} start={timerStarted} />;
  } else {
    return (
      <div className="mb-3 w-full bg-gray-200 rounded-full overflow-hidden h-2"></div>
    );
  }
};
