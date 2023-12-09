import { MdNavigateNext } from "react-icons/md";

type QuizNavProps = {
  qLength: number;
  isCorrect: boolean | undefined;
  index: number;
  handleNextQuestion: () => void;
  handleDisplayResults: () => void;
};

// This handles next question for now, which activates when the user has pressed submit, therefore we have isCorrect
// If it reaches the end it shows a display results instead
const QuizNavigation = ({
  qLength,
  isCorrect,
  index,
  handleNextQuestion,
  handleDisplayResults,
}: QuizNavProps) => {
  return isCorrect !== undefined && index + 1 < qLength ? (
    <button
      className="
                  flex items-center gap-1
                  px-4 py-2
                  border border-foreground
                  bg-background hover:bg-foreground
                  active:translate-y-1
                  text-foreground hover:text-slate-950
                  transition"
      type="button"
      onClick={handleNextQuestion}
    >
      <p>Next</p>
      <MdNavigateNext />
    </button>
  ) : (
    <button
      className="
                  flex items-center gap-1
                  px-4 py-2
                  border border-foreground
                  active:translate-y-1
                  bg-background hover:bg-foreground
                  text-foreground hover:text-slate-950
                  transition"
      type="button"
      onClick={handleDisplayResults}
    >
      <p>Show Results</p>
      <MdNavigateNext />
    </button>
  );
};

export default QuizNavigation;
