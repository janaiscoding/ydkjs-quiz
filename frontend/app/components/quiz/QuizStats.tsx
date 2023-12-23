const QuizStats = ({
  current,
  total,
  score,
}: {
  current: number;
  total: number;
  score: number;
}) => {
  return (
    <div>
      <p>
        Question {current} out of {total}
      </p>

      <p>Your score: {score}</p>
    </div>
  );
};

export default QuizStats;
