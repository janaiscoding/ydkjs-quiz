"use client";

import { useQuizzes } from "./hooks/useQuizzes";
import PageTitle from "./ui/PageTitle";

export default function Homepage() {
  const quizzes = useQuizzes();
  const title = "Select your quiz!";

  return (
    <div className="flex flex-col items-start p-16 gap-4 min-h-[95vh]">
      <PageTitle title={title} />
      {quizzes?.map((quiz, idx) => (
        <a
          key={quiz._id}
          className="text-2xl hover:text-indigo-400"
          href={`/quiz/${quiz._id}`}
        >
          {idx + 1}. {quiz.title} ({quiz.questions.length} questions)
        </a>
      ))}
    </div>
  );
}
