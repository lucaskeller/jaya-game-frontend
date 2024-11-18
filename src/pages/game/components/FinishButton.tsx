interface FinishButtonProps {
  onClick: () => void;
}

export const FinishButton = ({ onClick }: FinishButtonProps) => (
  <button
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    onClick={onClick}
  >
    finish game
  </button>
);
