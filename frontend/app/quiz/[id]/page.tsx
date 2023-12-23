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

  // current displayed question index
  const [idx, setIdx] = useState(0);
  // used for manipulating enter and exit animations
  const questionRef = useRef<HTMLDivElement>(null);

  const onIncrementIdx = () => {
    resetCurrentAns();
    if (idx + 1 < questions.length && questionRef.current) {
      // we make the old question exit
      animateNextExit(questionRef);
      setTimeout(() => {
        //after 500ms we make the new question enter
        animateNextEnter(questionRef);
        setIdx((prevIdx) => prevIdx + 1);
      }, 500);
    }
  };

  const onDecrementIdx = () => {
    resetCurrentAns();
    if (idx > 0 && questionRef.current) {
      animatePrevExit(questionRef);
      setTimeout(() => {
        setIdx((prevIdx) => prevIdx - 1);
        animatePrevEnter(questionRef);
      }, 500);
    }
  };

  const [userScore, setUserScore] = useState(0); // session score
  const [userAns, setUserAns] = useState({} as Answer); // helper for storing session
  const [emptyError, setEmptyError] = useState<boolean | null>(null);
  const [isCorrectAns, setIsCorrAns] = useState<boolean | null>(null); //display right or wrong for each question

  const [sessionQ, setSessionQ] = useState([] as Question[]);

  const onSubmitAnswer = () => {
    //if we submit with no answer, display error and stop
    if (!userAns.answer) {
      setEmptyError(true);
      return;
    }

    // in case there is an empty error now we clean it
    setEmptyError(null);
    // look at Answer.isCorrect and display feedback
    setIsCorrAns(userAns.isCorrect);

    // increment score only if correct
    if (userAns.isCorrect) {
      setUserScore((score) => score + 1);
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
    if (isCorrectAns === null) {
      setUserAns(ans);
    }
  };

  // used because we need to show feedback for each question
  const resetCurrentAns = () => {
    setEmptyError(null);
    setIsCorrAns(null);
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
          <QuizStats
            score={userScore}
            current={idx + 1}
            total={questions.length}
          />
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
            <QuizFeedback isCorrect={isCorrectAns} emptyError={emptyError} />
          </div>
          <QuizButtons
            onSubmit={onSubmitAnswer}
            onIncrement={onIncrementIdx}
            onDecrement={onDecrementIdx}
            disabledStatus={
              isCorrectAns !== null || (sessionQ[idx]?.userAns && true)
            }
          />
        </>
      )}
    </div>
  );
};

export default ChapterPage;
