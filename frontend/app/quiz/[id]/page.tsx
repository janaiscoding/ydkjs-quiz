"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { useState } from "react";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);

  const [idx, setIdx] = useState(0);

  const incrementIdx = () => {
    setIdx((prevIdx) => prevIdx + 1);
  };

  const decrementIdx = () => {
    if (idx > 0) {
      setIdx((prevIdx) => prevIdx - 1);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20 md:min-w-5xl">
      {isLoading && <p>loading...</p>}

      {quiz && questions && (
        <div className="max-w-md">
          <h1>{quiz.title} Quiz</h1>
          <div>
            Progress: {idx + 1} / {questions?.length}
          </div>
          <div>
            <p>{questions[idx]?.title}</p>
          </div>

          <div>
            <button onClick={decrementIdx}>prev</button>
            <button onClick={incrementIdx}>next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterPage;
