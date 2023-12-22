"use client";

import { useQuizzes } from "./hooks/useQuizzes";
import React, { useEffect, useState } from "react";
import { HomepageIntro } from "./components/homepage/HomepageIntro";
import Loader from "./ui/Loader";

export default function Homepage() {
  const [isShown, setShown] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const quizzes = useQuizzes();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[95vh]">
      {isLoading && <Loader />}

      {!isLoading && !isShown && <HomepageIntro setShown={setShown} />}

      {!isLoading && (
        <div className={`${isShown ? "animate__enter" : "hidden"} flex gap-4 flex-col px-16`}>
          <h1 className="text-xl text-indigo-400">Select your quiz!</h1>
          {quizzes?.map((quiz, idx) => (
            <div key={quiz._id}>
              <a className="text-2xl hover:text-indigo-400" href={`/quiz/${quiz._id}`}>
                {idx + 1}. {quiz.title} ({quiz.questions.length} questions)
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
