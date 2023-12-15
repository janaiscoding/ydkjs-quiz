"use client";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import useTokenAuth from "./hooks/useTokenAuth";
import { QuizzesContext } from "./context/quizzesContext";
import getQuizzes from "./api_functions/quizzes/get_quizzes";
import createQuiz from "./api_functions/quizzes/create_quiz";
import AddQuizForm from "./components/quizzes/AddQuizForm";
import AddQuestionForm from "./components/questions/AddQuestionForm";
import Sidebar from "./components/navigation/Sidebar";
import Navbar from "./components/navigation/Navbar";

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
    <main className="flex flex-col w-full bg-zinc-900 min-h-screen">
      <Navbar />
      <div className="p-4 md:p-0 flex gap-0 md:gap-20 w-full h-full min-h-[96rem]">
        <Sidebar />
        {isLoading ? (
          <p>Loading quizzes...</p>
        ) : (
          <div className="flex gap-2 flex-col py-4">
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
      </div>
    </main>
  );
}
