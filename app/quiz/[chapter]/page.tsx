"use client";
import Breadcrumbs from "@/app/components/quiz/breadcrumbs";
import { useEffect, useState } from "react";
import { TQuiz } from "@/app/utils/types";
import quiz from "@/app/data/full-quiz-data";
import QuizGame from "@/app/components/quiz/quiz-game";

const ChapterPage = ({ params }: { params: { chapter: string } }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [activeQuiz, setActiveQuiz] = useState<TQuiz | undefined>();

  useEffect(() => {
    if (quiz) {
      const quizData: TQuiz = quiz.find(
        (chapter) => chapter.url === params.chapter
      )!;
      if (!quizData) {
        // in case the user puts a manual /chapter url
        console.log("redirecting...");
      } else {
        setActiveQuiz(quizData);
        setPageTitle(quizData.title);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20 md:min-w-5xl">
      <Breadcrumbs chapter={pageTitle} />
      {activeQuiz && <QuizGame activeQuiz={activeQuiz} />}
    </div>
  );
};

export default ChapterPage;
