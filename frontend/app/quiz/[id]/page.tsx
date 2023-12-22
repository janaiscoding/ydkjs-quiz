"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { useRef, useState } from "react";
import Loader from "@/app/ui/Loader";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import { formatToMarkdown } from "@/app/utils/stringFormatters";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);

  // Question trigger logic
  const [idx, setIdx] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);

  const incrementIdx = () => {
    if (idx + 1 < questions.length && questionRef.current) {
      questionRef.current!.classList.remove("animate__enter");
      questionRef.current.classList.add("animate__exit");
      questionRef.current.classList.remove("animate__come__from__left");

      setTimeout(() => {
        setIdx((prevIdx) => prevIdx + 1);
        questionRef.current!.classList.remove("animate__exit");
        questionRef.current!.classList.remove("animate__come__from__left");
        questionRef.current!.classList.add("animate__enter");
      }, 500);
    }
  };

  const decrementIdx = () => {
    if (idx > 0 && questionRef.current) {
      questionRef.current.classList.remove("animate__come__from__left");
      questionRef.current.classList.add("animate__go__to__right");

      setTimeout(() => {
        setIdx((prevIdx) => prevIdx - 1);
        questionRef.current!.classList.remove("animate__go__to__right");
        questionRef.current!.classList.add("animate__come__from__left");
      }, 500);
    }
  };

  return (
    <div className="w-full bg-sky-950/20 min-h-[95vh] md:px-16 px-6">
      <div className="max-w-2xl m-auto">{isLoading && <Loader />}</div>

      {!isLoading && quiz && questions && (
        <>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>{quiz.title}</li>
            </ul>
          </div>

          <p>
            Question {idx + 1} of {questions.length}
          </p>
          <div
            className="w-full flex flex-col justify-between gap-4 bg-sky-950 p-6"
            ref={questionRef}
            id="question-ref"
          >
            <div className="text-neutral-50 py-2 max-w-md">
              <MarkdownWrapper
                content={formatToMarkdown(questions[idx]?.title)}
              />
            </div>
            <div>
              {questions[idx].answers.map((ans) => (
                <div key={ans._id}>{ans.answer}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={decrementIdx}>prev</button>
            <button>submit</button>
            <button onClick={incrementIdx}>next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterPage;
