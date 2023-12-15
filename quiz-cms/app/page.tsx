"use client";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import useTokenAuth from "./hooks/useTokenAuth";
import { QuizzesContext } from "./context/quizzesContext";
import getQuizzes from "./api_functions/quizzes/get_quizzes";
import createQuiz from "./api_functions/quizzes/create_quiz";
import AddQuizForm from "./components/quizzes/AddQuizForm";
import AddQuestionForm from "./components/questions/AddQuestionForm";

export default function Home() {
  // Protected.
  useTokenAuth();
  const quizzesContext = useContext(QuizzesContext);
  // Loading effect
  const [isLoading, setLoading] = useState(true);
  // New quiz title
  const [title, setTitle] = useState("");
  // Fetch and set context
  const fetchQuizzes = async () => {
    setLoading(true);
    const myQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(myQuizzes);
    setLoading(false);
  };
  // Submit a new quiz
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createQuiz(title, onSuccess);
  };
  // Refetch after new quiz success + clear form
  const onSuccess = () => {
    fetchQuizzes();
    setTitle("");
  };
  // Initial render
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

          <AddQuestionForm />
        </div>
      )}
    </main>
  );
}
