"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loader from "@/app/ui/Loader";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import { formatToMarkdown } from "@/app/utils/stringFormatters";
import { Answer, Question } from "@/app/utils/types";
import QuizApp from "./QuizApp";
import { on } from "events";
import QuizButtons from "./QuizButtons";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);

  const [idx, setIdx] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);

  const onIncrementIdx = () => {
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

  const onDecrementIdx = () => {
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

  const [userScore, setUserScore] = useState(0);
  const [userAns, setUserAns] = useState({} as Answer); // helper for storing session
  const [emptyError, setEmptyError] = useState<boolean | null>(null);
  const [isCorrectAns, setIsCorrAns] = useState<boolean | null>(null); //display right or wrong for each question

  const [sessionQ, setSessionQ] = useState([] as Question[]);

  const onSubmitAnswer = () => {
    // only when an answer is picked
    if (isCorrectAns === null && userAns.answer) {
      // in case there is an empty error now we clean it
      setEmptyError(null);
      // check if correct and set that for displaying correct/wrong
      setIsCorrAns(userAns.isCorrect);

      // increment score only if correct
      if (userAns.isCorrect) {
        setUserScore((score) => score + 1);
      }

      //update user state for the current quiz questions
      let prevState = [...sessionQ];
      prevState[idx] = {
        ...prevState[idx],
        userAns: userAns,
      };
      // update game app state
      setSessionQ(prevState);
    } else {
      setEmptyError(true);
    }
  };

  const onChangeAns = (ans: Answer) => {
    if (isCorrectAns === null) {
      setUserAns(ans);
    }
  };
  useEffect(() => {
    setSessionQ(questions);
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
            </ul>
          </div>
          <p>
            Question {idx + 1} out of {questions.length}
          </p>
          <div
            className="w-full flex flex-col justify-between gap-4 bg-sky-950 p-2 md:p-6"
            ref={questionRef}
            id="question-ref"
          >
            <QuizApp
              idx={idx}
              questions={sessionQ}
              onChangeAns={onChangeAns}
              userAns={userAns}
            />
            {emptyError && <p>You must pick an answer</p>}
            {isCorrectAns && <p>Correct!</p>}
            {isCorrectAns === false && <p>Wrong!</p>}
          </div>
          <QuizButtons
            onSubmit={onSubmitAnswer}
            onIncrement={onIncrementIdx}
            onDecrement={onDecrementIdx}
            disabledStatus={isCorrectAns !== null && true}
          />
        </>
      )}
    </div>
  );
};

export default ChapterPage;
