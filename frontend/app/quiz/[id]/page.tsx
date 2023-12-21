"use client";
import useQuiz from "@/app/hooks/useQuiz";

const ChapterPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, quiz } = useQuiz(params.id);

  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20 md:min-w-5xl">
      {isLoading && <p>loading...</p>}

      {quiz && (
        <div>
          <h1>{quiz.title}</h1>
        </div>
      )}
    </div>
  );
};

export default ChapterPage;
