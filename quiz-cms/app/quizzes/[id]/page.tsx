"use client";
import createQuestion from "@/app/api_functions/create_question";
import editQuizTitle from "@/app/api_functions/edit_quiz_title";
import getQuizz from "@/app/api_functions/get_quiz";
import AddQuestionForm from "@/app/components/AddQuestionForm";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";

import useTokenVerification from "@/app/hooks/useTokenVerification";
import { Quiz } from "@/app/utils/types";
import { CiWarning } from "react-icons/ci";
import { SyntheticEvent, useEffect, useState } from "react";

const QuizPage = ({ params }: { params: { id: string } }) => {
  useTokenVerification();

  const [showQuestions, setShowQuestions] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [isLoading, setLoading] = useState(true);

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");

  const [showEditTitle, setShowEditTitle] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");

  const fetchQuiz = async () => {
    setLoading(true);
    const myQuiz = await getQuizz(params.id);
    setQuiz(myQuiz);
    setLoading(false);
    setQuizTitle(myQuiz.title.trim().split("\\n").join("\n"));
  };

  const onSuccess = () => {
    fetchQuiz();
    setShowAddQuestion(false);
    setShowEditTitle(false);
    setShowQuestions(false);
    setQuestionTitle("");
    setQuizTitle("");
  };

  const onEditQuizTitle = (e: SyntheticEvent) => {
    e.preventDefault();
    editQuizTitle(params.id, quizTitle, onSuccess);
  };

  const onAddQuestion = (e: SyntheticEvent) => {
    e.preventDefault();
    let formattedTitle = questionTitle.trim().split(/\n/).join("\\n");
    createQuestion(params.id, formattedTitle, onSuccess);
  };
  const onDelete = () => {
    //delete quiz
    //redirect to homepage
  };
  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen py-10 px-4 max-w-4xl flex flex-col gap-4 items-start">
      <a href="/" className="text-neutral-400 hover:text-blue-500 underline">
        Home
      </a>
      {isLoading && <p>please wait...</p>}

      {!isLoading && (
        <>
          <h1 className="text-2xl text-yellow-400">
            You are now editing: {quiz?.title}
          </h1>

          <ToggleButton
            target={showEditTitle}
            toggler={setShowEditTitle}
            buttonText="Edit title"
          />
          {showEditTitle && (
            <EditTitleForm
              defaultTitle={quizTitle}
              legend={"quiz"}
              setTitle={setQuizTitle}
              onSubmit={onEditQuizTitle}
            />
          )}

          <ToggleButton
            target={showAddQuestion}
            toggler={setShowAddQuestion}
            buttonText="Add question"
          />

          {showAddQuestion && (
            <AddQuestionForm
              setQuestion={setQuestionTitle}
              onSubmit={onAddQuestion}
            />
          )}

          <ToggleButton
            target={showQuestions}
            toggler={setShowQuestions}
            buttonText="Show questions"
          />
          {showQuestions && (
            <div>
              {quiz?.questions?.length === 0 && <p> No questions yet </p>}
              {quiz?.questions?.length > 0 && (
                <div className="flex flex-col gap-2">
                  {quiz?.questions?.map((q, idx) => (
                    <a
                      className="link"
                      href={`/questions/${q._id}`}
                      key={q._id}
                    >
                      {idx + 1}. {q.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={onDelete}
            className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-red-400"
          >
            <CiWarning />
            Delete quiz
          </button>
        </>
      )}
    </main>
  );
};

export default QuizPage;
