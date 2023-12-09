"use client";
import Breadcrumbs from "@/app/components/quiz/breadcrumbs";
import QuizGame from "@/app/components/quiz/quiz-game";
import { useQuizFetcher } from "@/app/hooks/useQuizFetcher";

const ChapterPage = ({ params }: { params: { chapter: string } }) => {
  const activeQuiz = useQuizFetcher(params.chapter);

  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20 md:min-w-5xl">
      <Breadcrumbs chapter={activeQuiz?.title} />
      {!activeQuiz && <p>Loading quiz game...</p>}
      {activeQuiz && <QuizGame activeQuiz={activeQuiz} />}
    </div>
  );
};

export default ChapterPage;
