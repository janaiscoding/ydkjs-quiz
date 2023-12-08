"use client";
import Breadcrumbs from "@/app/components/quiz/breadcrumbs";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import data from "@/app/data/data";
import { TQuestion } from "@/app/utils/types";
import QuizForm from "@/app/components/quiz/QuizForm";

const ChapterPage = ({ params }: { params: { chapter: string } }) => {
  const [pageTitle, setPageTitle] = useState("");
  // All questions for current chapter
  const [questions, setQuestions] = useState<TQuestion[] | undefined>(
    [] as TQuestion[]
  );

  useEffect(() => {
    const quizData = data.find((chapter) => chapter.url === params.chapter);

    if (!quizData) {
      // in case the user puts a manual /chapter url
      console.log("redirecting...");
    } else {
      setPageTitle(quizData.title);
      setQuestions(quizData.questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20">
      <Breadcrumbs chapter={pageTitle} />
      {questions && questions.length > 0 && <QuizForm questions={questions} />}
    </div>
  );
};

export default ChapterPage;
