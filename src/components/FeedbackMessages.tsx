interface FeedbackMessageProps {
    isAnswerRevealed: boolean;
    answer: string | null;
    correctAnswer: string | null;
    timeUp: boolean;
}
  
export const FeedbackMessage = ({ isAnswerRevealed, answer, correctAnswer, timeUp }: FeedbackMessageProps) => {
    if (!isAnswerRevealed) return null;

    let message = "";
    let className = "";

    if (timeUp) {
        message = "Time is up!";
        className = "blinking-text incorrect";
    } else if (answer === correctAnswer) {
        message = "Correct!";
        className = "blinking-text correct";
    } else {
        message = "Incorrect!";
        className = "blinking-text incorrect";
    }

    return (
        <p className={`p-5 left-0 w-full text-center ${className}`}>
            {message}
        </p>
    );
};
