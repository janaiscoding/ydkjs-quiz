"use client";

import { useQuizzes } from "./hooks/useQuizzes";
import Image from "next/image";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import TypewriterComponent from "typewriter-effect";

export default function Homepage() {
  const [isShown, setShown] = useState(false);
  const [buttonText, setButtonText] = useState("I'm ready!");

  const words: string[] = [
    "the passion for learning!",
    "the motivation to level up!",
    "You Don't Know JS Yet!",
  ];
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleAnimation = () => {
    if (imageRef.current && textRef.current) {
      imageRef.current.classList.add("animate__exit");
      textRef.current.classList.add("animate__exit");
    }

    setTimeout(() => {
      setShown(true);
    }, 500);
  };

  const quizzes = useQuizzes();

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-10 my-6 md:my-20">
      {!isShown && (
        <>
          <div className="basis-full animate__from__top" ref={imageRef}>
            <Image
              src={"/illustration.png"}
              alt="illustration"
              width={600}
              height={600}
              className="object-fit w-60 md:w-96 float__image"
              priority={true}
            />
          </div>

          <div
            ref={textRef}
            className="basis-full flex flex-col gap-6 items-center justify-center text-center animate__from__bottom"
          >
            <div className="text-4xl max-w-3xl">
              A fun, educative quiz inspired by
              <TypewriterComponent
                options={{
                  strings: words,
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "",
                  deleteSpeed: 100,
                  delay: 100,
                }}
              />
            </div>
            <button
              className="btn__quiz"
              onClick={() => handleAnimation()}
              onMouseEnter={() => setButtonText("Let's play")}
              onMouseLeave={() => setButtonText("I'm ready!")}
            >
              {buttonText}
            </button>
          </div>
        </>
      )}

      <div className={`${isShown ? "animate__enter" : "hidden"}`}>
        <div>Your quizzes</div>
        {quizzes?.map((quiz) => (
          <p key={quiz._id}> {quiz.title}</p>
        ))}
      </div>
    </div>
  );
}
