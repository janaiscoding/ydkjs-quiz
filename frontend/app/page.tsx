"use client";

import { useQuizzes } from "./hooks/useQuizzes";
import React, { useState } from "react";
import { HomepageIntro } from "./components/homepage/HomepageIntro";
import { FaRegEye } from "react-icons/fa";

export default function Homepage() {
  const [isShown, setShown] = useState(false);

  const quizzes = useQuizzes();

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-10 my-6 md:my-20">
      {!isShown && <HomepageIntro setShown={setShown} />}

      <div className={`${isShown ? "animate__enter" : "hidden"}`}>
        <h1>Select your quiz!</h1>
        {quizzes?.map((quiz, idx) => (
          <div key={quiz._id}>
            <a className="text-2xl" href={`/quiz/${quiz._id}`}>
              {idx + 1}. {quiz.title} ({quiz.questions.length} questions)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
