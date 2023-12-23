const QuizFeedback = ({
  isCorrect,
  emptyError,
}: {
  isCorrect: boolean | null;
  emptyError: boolean | null;
}) => {
  return (
    <>
      {emptyError && <p>You must pick an answer</p>}
      {isCorrect && <p>Correct!</p>}
      {isCorrect === false && <p>Wrong!</p>}
    </>
  );
};

export default QuizFeedback;
