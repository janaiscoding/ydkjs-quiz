"use client";
import { useContext, useEffect } from "react";
import { useQuizzes } from "../hooks/useQuizzes";
import { QuizzesContext } from "../context/QuizzesContext";
import getQuizzes from "../api_and_fetchers/get_quizzes";

const QuizzesPage = () => {
  const quizzes = useQuizzes();
  return (
    <div className="flex flex-col justify-center gap-4 md:gap-10 my-6 md:my-20">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a aria-label="link to home" href="/">
              Home
            </a>
          </li>
          <li>Quizzes</li>
        </ul>
      </div>
      <div className="text-4xl gradient__text">select your chapter</div>
      {quizzes?.length === 0 && <p>loading...</p>}
      <ul>
        {quizzes?.map((chap) => (
          <li
            key={chap._id}
            className="text-2xl hover:text-foreground transition p-1"
          >
            <h1 aria-labelledby={`link for the ${chap.title} quiz chapter`}>
              {chap.title}
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizzesPage;
