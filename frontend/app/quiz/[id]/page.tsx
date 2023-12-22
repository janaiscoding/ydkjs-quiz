"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loader from "@/app/ui/Loader";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import { formatToMarkdown } from "@/app/utils/stringFormatters";
import { Answer, Question } from "@/app/utils/types";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);

  // Question trigger logic
  const [idx, setIdx] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);

  const incrementIdx = () => {
    setIsCorrAns(null);
    setUserAns({} as Answer);
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
    setUserAns({} as Answer);
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
  // must store the user answers
  const [userAns, setUserAns] = useState({} as Answer);
  const [isCorrectAns, setIsCorrAns] = useState<boolean | null>(null);

  // we created this for storing the user selected answers so we can see when we go prev/next
  const [playedQ, setPlayedQ] = useState([] as Question[]);
  const [userScore, setUserScore] = useState(0);

  const onCheckAns = () => {
    if (isCorrectAns === null && userAns.answer) {
      // check if correct and set that for displaying correct/wrong
      setIsCorrAns(userAns.isCorrect);

      // increment score only if correct
      if (userAns.isCorrect) {
        setUserScore((score) => score + 1);
      }
      //update user state for the current quiz questions
      let prevState = [...playedQ];
      prevState[idx] = {
        ...prevState[idx],
        userAns: userAns,
      };
      // update game app state
      setPlayedQ(prevState);
    }
  };

  useEffect(() => {
    setPlayedQ(questions);
  }, [questions]);

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
          <div>Your current score: {userScore}</div>
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
              {playedQ[idx].answers.map((ans, i) => (
                <label
                  key={i}
                  className={`flex gap-2 items-center hover:cursor-pointer
                  ${
                    isCorrectAns !== null || playedQ[idx].userAns !== undefined
                      ? ans.isCorrect
                        ? "text-green-400"
                        : "text-red-400"
                      : " "
                  }
                  `}
                >
                  <input
                    type="checkbox"
                    value={ans.answer}
                    onChange={() => {
                      if (isCorrectAns === null) {
                        setUserAns(ans);
                      }
                    }}
                    checked={
                      ans.answer === userAns.answer ||
                      playedQ[idx]?.userAns?.answer === ans.answer
                    }
                    className="checkbox checkbox-warning checkbox-sm"
                    disabled={playedQ[idx].userAns !== undefined}
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
