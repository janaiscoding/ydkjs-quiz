"use client";

import { useQuizzes } from "./hooks/useQuizzes";
import Image from "next/image";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import TypewriterComponent from "typewriter-effect";
import { HomepageIntro } from "./components/homepage/HomepageIntro";

export default function Homepage() {
  const [isShown, setShown] = useState(false);

  const quizzes = useQuizzes();

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-10 my-6 md:my-20">
      {!isShown && <HomepageIntro setShown={setShown} />}

      <div className={`${isShown ? "animate__enter" : "hidden"}`}>
        <div>Your quizzes</div>
        {quizzes?.map((quiz) => (
          <p key={quiz._id}> {quiz.title}</p>
        ))}
      </div>
    </div>
  );
}
