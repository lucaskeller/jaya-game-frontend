import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  start: boolean;
}

export const Timer = ({ duration, onTimeUp, start }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (start) {
      if (timeLeft === 0) {
        setTimeLeft(duration);
      }

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer!);
            onTimeUp();
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [start, duration, onTimeUp]);

  const progressWidth = (timeLeft / duration) * 100;

  return (
    <div className="mb-3 w-full bg-gray-200 rounded-full overflow-hidden h-2">
      <div
        data-testid="progresbar"
        className="bg-red-500 h-full rounded-full"
        style={{ width: `${progressWidth}%` }}
      />
    </div>
  );
};
