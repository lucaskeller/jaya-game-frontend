export const ConfirmButton = ({ onClick, disabled }) => (
    <button
      disabled={disabled}
      className={`px-4 py-2 bg-green-500 text-white rounded ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-600'}`}
      onClick={onClick}
    >
      Confirm
    </button>
  );