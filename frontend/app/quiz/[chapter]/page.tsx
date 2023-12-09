"use client";
import Breadcrumbs from "@/frontend/app/components/quiz/breadcrumbs";
import QuizGame from "@/frontend/app/components/quiz/quiz-game";
import { useQuizFetcher } from "@/frontend/app/hooks/useQuizFetcher";

const ChapterPage = ({ params }: { params: { chapter: string } }) => {
  const quiz = useQuizFetcher(params.chapter);

  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20 md:min-w-5xl">
      <Breadcrumbs chapter={quiz?.title} />
      {!quiz && <p>Loading quiz game...</p>}
      {quiz && <QuizGame quiz={quiz} />}
    </div>
  );
};

export default ChapterPage;
