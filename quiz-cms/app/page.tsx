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
import { ViewContext } from "./context/viewContext";
import Footer from "./components/navigation/Footer";
import ToggleButton from "./components/ToggleButton";
import QuizContainer from "./components/quizzes/QuizContainer";

export default function Home() {
  // Protected.
  useTokenAuth();

  const quizzesContext = useContext(QuizzesContext);
  const viewContext = useContext(ViewContext);

  // Loading effect
  const [isLoading, setLoading] = useState(true);

  // Fetch and set context
  const fetchQuizzes = async () => {
    setLoading(true);
    const myQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(myQuizzes);
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 flex gap-0 md:gap-20 w-full h-full">
      {viewContext.view === "quizzes" && isLoading && <p>Loading quizzes...</p>}

      {viewContext.view === "quizzes" && !isLoading && (
        <div className="flex gap-4 flex-col py-4">
          {quizzesContext.quizzes?.map((quiz, idx) => (
            <QuizContainer key={idx} quiz={quiz} idx={idx} />
          ))}
        </div>
      )}

      {viewContext.view === "add-quiz" && <AddQuizForm />}

      {viewContext.view === "add-question" && <AddQuestionForm />}
    </div>
  );
}
