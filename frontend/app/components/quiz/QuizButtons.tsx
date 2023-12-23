type QuizButtonProps = {
  current: number;
  total: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onSubmit: () => void;
  disabledStatus: boolean;
};

const QuizButtons = ({
  current,
  total,
  onIncrement,
  onDecrement,
  onSubmit,
  disabledStatus,
}: QuizButtonProps) => {
  return (
    <div className="flex gap-4">
      {current === 1 ? (
        <button disabled>No prev</button>
      ) : (
        <button onClick={onDecrement}>prev</button>
      )}

      <button
        className={"bg-sky-950 p-2 disabled:bg-slate-700"}
        disabled={disabledStatus}
        onClick={onSubmit}
      >
        submit
      </button>

      {current === total ? (
        <button disabled>No next</button>
      ) : (
        <button onClick={onIncrement}>Next</button>
      )}
    </div>
  );
};

export default QuizButtons;
