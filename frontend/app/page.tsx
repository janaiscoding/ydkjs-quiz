"use client";

import { useQuizzes } from "./hooks/useQuizzes";
import PageTitle from "./ui/PageTitle";

export default function Homepage() {
  const quizzes = useQuizzes();
  const title = "Select your quiz!";

  return (
    <div className="flex flex-col items-start gap-4 max-w-4xl m-auto py-6">
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
