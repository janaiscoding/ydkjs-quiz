"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { useRef, useState } from "react";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);

  // Question trigger logic 
  const [idx, setIdx] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);

  const incrementIdx = () => {
    if (questionRef.current) {
      questionRef.current!.classList.remove("animate__enter");
      questionRef.current.classList.add("animate__exit");

      setTimeout(() => {
        setIdx((prevIdx) => prevIdx + 1);
        questionRef.current!.classList.remove("animate__exit");
        questionRef.current!.classList.add("animate__enter");
      }, 500);
    }
  };

  const decrementIdx = () => {
    if (idx > 0 && questionRef.current) {
      questionRef.current.classList.remove("animate__enter");
      questionRef.current.classList.add("animate__exit");

      setTimeout(() => {
        setIdx((prevIdx) => prevIdx - 1);
        questionRef.current!.classList.remove("animate__exit");
        questionRef.current!.classList.add("animate__enter");
      }, 500);
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

          <div className="bg-slate-400 p-10 text-slate-950" ref={questionRef}>
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
