"use client";

import getQuizz from "@/app/api_functions/get_quiz";

import useTokenVerification from "@/app/hooks/useTokenVerification";
import { Quiz } from "@/app/utils/types";
import { SyntheticEvent, useEffect, useState } from "react";

const QuizPage = ({ params }: { params: { id: string } }) => {
  useTokenVerification();
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [questionTitle, setQuestionTitle] = useState("");

  const fetchQuizz = async () => {
    const myQuiz = await getQuizz(params.id);
    setQuiz(myQuiz);
  };

  useEffect(() => {
    fetchQuizz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onAddQuestion = (e: SyntheticEvent) => {
    e.preventDefault();
    let title = questionTitle.trim().split(/\n/).join("\\n");
    
  };
  return (
    <main className="min-h-screen py-10 px-4">
      <h1 className="text-2xl text-yellow-400">Quizz title: {quiz?.title}</h1>
      {quiz?.questions?.length === 0 && <p> No questions yet </p>}
      {quiz?.questions?.length > 0 && (
        <div>
          <h2>Quizz questions</h2>
          {quiz?.questions?.map((q, idx) => (
            <div key={q._id}>
              {idx + 1}. {q.title}
            </div>
          ))}
        </div>
      )}

      <form
        className="p-4 border border-solid flex flex-col gap-4"
        onSubmit={(e) => onAddQuestion(e)}
      >
        <legend>Add a new question</legend>
        <label className="flex flex-col gap-4">
          Question title
          <textarea
            onChange={(e) => setQuestionTitle(e.target.value)}
            className="text-slate-950"
          ></textarea>
        </label>
        <button type="submit">Add question</button>
      </form>
    </main>
  );
};

export default QuizPage;
