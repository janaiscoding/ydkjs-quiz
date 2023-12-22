"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { ChangeEvent, useRef, useState } from "react";
import Loader from "@/app/ui/Loader";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import { formatToMarkdown } from "@/app/utils/stringFormatters";
import { Answer } from "@/app/utils/types";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);

  // Question trigger logic
  const [idx, setIdx] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);

  const incrementIdx = () => {
    setIsCorrAns(null);
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
    setIsCorrAns(null);
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

  // answer handle logic
  const [userAns, setUserAns] = useState({} as Answer);
  const [isCorrectAns, setIsCorrAns] = useState<boolean | null>(null);

  const onCheckAns = () => {
    if (isCorrectAns === null && userAns.answer) {
      setIsCorrAns(userAns.isCorrect);
    }
  };

  return (
    <div className="w-full bg-sky-950/20 min-h-[95vh] md:px-16 p-6 flex justify-between flex-col md:justify-start">
      <div className={`${!isLoading && "hidden"} max-w-2xl m-auto`}>
        {isLoading && <Loader />}
      </div>

      {!isLoading && quiz && questions && (
        <>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>{quiz.title}</li>
              <li>
                Question {idx + 1} of {questions.length}
              </li>
            </ul>
          </div>

          <div
            className="w-full flex flex-col justify-between gap-4 bg-sky-950 p-2 md:p-6"
            ref={questionRef}
            id="question-ref"
          >
            <div className="text-neutral-50 py-2 max-w-md">
              <MarkdownWrapper
                content={formatToMarkdown(questions[idx]?.title)}
              />
            </div>
            <div className="flex flex-col gap-2">
              {questions[idx].answers.map((ans, i) => (
                <label
                  key={i}
                  className={`flex gap-2 items-center hover:text-slate-50 hover:cursor-pointer ${
                    isCorrectAns !== null && ans.isCorrect && "text-green-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={ans.answer}
                    onChange={() => {
                      if (isCorrectAns === null) {
                        setUserAns(ans);
                      }
                    }}
                    checked={ans.answer === userAns.answer}
                    className="checkbox checkbox-warning checkbox-sm"
                  />
                  <MarkdownWrapper content={ans.answer} />
                </label>
              ))}
            </div>
            {isCorrectAns && <p>Correct!</p>}
            {isCorrectAns === false && <p>Wrong!</p>}
          </div>
          <div className="flex gap-4">
            <button onClick={decrementIdx}>prev</button>
            <button
              className={"bg-sky-950 p-2 disabled:bg-slate-700"}
              disabled={isCorrectAns !== null && true}
              onClick={onCheckAns}
            >
              submit
            </button>
            <button onClick={incrementIdx}>next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterPage;
