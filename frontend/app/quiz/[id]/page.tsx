"use client";
import useQuiz from "@/app/hooks/useQuiz";
import { useEffect, useRef, useState } from "react";
import Loader from "@/app/ui/Loader";

import { Answer, Question } from "@/app/utils/types";
import {
  animateNextEnter,
  animateNextExit,
  animatePrevEnter,
  animatePrevExit,
} from "@/app/utils/refAnimateHandlers";
import QuizNav from "@/app/components/quiz/QuizNav";
import QuizStats from "@/app/components/quiz/QuizStats";
import QuizApp from "@/app/components/quiz/QuizApp";
import QuizFeedback from "@/app/components/quiz/QuizFeedback";
import QuizButtons from "@/app/components/quiz/QuizButtons";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz, questions } = useQuiz(params.id);
  const [sessionQ, setSessionQ] = useState([] as Question[]);

  // current displayed question index
  const [idx, setIdx] = useState(0);
  // session score
  const [score, setScore] = useState(0);
  // helper for storing session
  const [userAns, setUserAns] = useState({} as Answer);
  const [emptyError, setEmptyError] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); //display right or wrong for each question

  // used for manipulating enter and exit animations
  const questionRef = useRef<HTMLDivElement>(null);

  const onIncrementIdx = () => {
    if (idx + 1 < questions.length && questionRef.current) {
      // we make the old question exit
      animateNextExit(questionRef);
      resetCurrentAns();
      setTimeout(() => {
        //after 500ms we make the new question enter
        animateNextEnter(questionRef);
        setIdx((prevIdx) => prevIdx + 1);
      }, 500);
    }
  };

  const onDecrementIdx = () => {
    if (idx > 0 && questionRef.current) {
      animatePrevExit(questionRef);
      setTimeout(() => {
        setIdx((prevIdx) => prevIdx - 1);
        animatePrevEnter(questionRef);
      }, 500);
    }

    resetCurrentAns();
  };

  const onSubmitAnswer = () => {
    //if we submit with no answer, display error and stop
    if (!userAns.answer) {
      setEmptyError(true);
      return;
    }

    // in case there is an empty error now we clean it
    setEmptyError(null);
    // look at Answer.isCorrect and display feedback
    setIsCorrect(userAns.isCorrect);

    // increment score only if correct
    if (userAns.isCorrect) {
      setScore((s) => s + 1);
    }

    // Update session state with the new user session submission
    let prevState = [...sessionQ];
    prevState[idx] = {
      ...prevState[idx],
      userAns: userAns,
    };
    // update game app state
    setSessionQ(prevState);
  };

  // only allow change if the answer wasn't submitted
  const onChangeAns = (ans: Answer) => {
    if (isCorrect === null) {
      setUserAns(ans);
    }
  };

  // used because we need to show feedback for each question
  const resetCurrentAns = () => {
    setEmptyError(null);
    setIsCorrect(null);
    setUserAns({} as Answer);
  };

  useEffect(() => {
    setSessionQ(questions);
  }, [questions]);

  return (
    <div className="w-full bg-sky-950/20 min-h-[95vh] md:px-16 p-6 flex flex-col gap-3">
      <div className={`${!isLoading && "hidden"} max-w-2xl m-auto`}>
        {isLoading && <Loader />}
      </div>
      {!isLoading && (
        <>
          <QuizNav title={quiz.title} />
          <QuizStats score={score} current={idx + 1} total={questions.length} />
        </>
      )}

      {!isLoading && (
        <>
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
            <QuizFeedback isCorrect={isCorrect} emptyError={emptyError} />
          </div>
          <QuizButtons
            current={idx + 1}
            total={questions.length}
            onSubmit={onSubmitAnswer}
            onIncrement={onIncrementIdx}
            onDecrement={onDecrementIdx}
            disabledStatus={
              isCorrect !== null || (sessionQ[idx]?.userAns && true)
            }
          />
        </>
      )}
    </div>
  );
};

export default ChapterPage;
