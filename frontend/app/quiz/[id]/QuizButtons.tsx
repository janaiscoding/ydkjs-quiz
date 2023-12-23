type QuizButtonProps = {
  onIncrement: () => void;
  onDecrement: () => void;
  onSubmit: () => void;
  disabledStatus: boolean;
};

const QuizButtons = ({
  onIncrement,
  onDecrement,
  onSubmit,
  disabledStatus,
}: QuizButtonProps) => {
  return (
    <div className="flex gap-4">
      <button onClick={onDecrement}>prev</button>
      <button
        className={"bg-sky-950 p-2 disabled:bg-slate-700"}
        disabled={disabledStatus}
        onClick={onSubmit}
      >
        submit
      </button>
      <button onClick={onIncrement}>next</button>
    </div>
  );
};

export default QuizButtons;
