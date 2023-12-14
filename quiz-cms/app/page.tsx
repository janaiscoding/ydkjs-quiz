"use client";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import useTokenAuth from "./hooks/useTokenAuth";
import { QuizzesContext } from "./context/quizzesContext";
import getQuizzes from "./api_functions/quizzes/get_quizzes";
import createQuiz from "./api_functions/quizzes/create_quiz";
import AddQuizForm from "./components/quizzes/AddQuizForm";

export default function Home() {
  useTokenAuth();

  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const quizzesContext = useContext(QuizzesContext);

  const fetchQuizzes = async () => {
    setLoading(true);
    const myQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(myQuizzes);
    setLoading(false);
  };
  const onSubmit = (e: SyntheticEvent) => {
    //add new quizz

    createQuiz(title, fetchQuizzes);

  };
  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="min-h-screen py-10 px-4">
      <h2 className="text-yellow-300 text-xl"> My quizzes </h2>
      {isLoading ? (
        <p>Loading quizzes...</p>
      ) : (
        <div className="flex gap-2 flex-col">
          {quizzesContext.quizzes?.map((quiz, idx) => (
            <div key={quiz._id}>
              <a href={`/quizzes/${quiz._id}`} className="link">
                {idx + 1}. {quiz.title}
              </a>
            </div>
          ))}

          <AddQuizForm setQuizTitle={setTitle} onSubmit={onSubmit} />
        </div>
      )}
    </main>
  );
}
