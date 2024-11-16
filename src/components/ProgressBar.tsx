import { useGameContext } from "../context/GameContext";

function ProgressBar() {
  const {currentQuestionIndex, totalQuestions} = useGameContext()

  return (
    <div className="space-y-4 mt-5">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full transition-colors ${
              i + 1 <= currentQuestionIndex
                ? "bg-blue-500"
                : "bg-gray-300"
            } flex items-center justify-center`}
          >
            <span className="text-xs text-white">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
