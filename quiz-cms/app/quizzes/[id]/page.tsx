"use client";

import createQuestion from "@/app/api_functions/questions/create_question";
import deleteQuiz from "@/app/api_functions/quizzes/delete_quiz";
import editQuizTitle from "@/app/api_functions/quizzes/edit_quiz_title";
import getQuiz from "@/app/api_functions/quizzes/get_quiz";
import AddQuestionForm from "@/app/components/AddQuestionForm";
import DeleteButton from "@/app/components/DeleteButton";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";
import useTokenAuth from "@/app/hooks/useTokenAuth";

import { Quiz } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

const QuizPage = ({ params }: { params: { id: string } }) => {
  // Auth
  useTokenAuth();
  const router = useRouter();

  // Loaders and togglers on/off
  const [isLoading, setLoading] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showEditTitle, setShowEditTitle] = useState(false);

  // quiz content
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  // state for a new question title
  const [questionTitle, setQuestionTitle] = useState("");
  // state for editting quiz title
  const [quizTitle, setQuizTitle] = useState("");

  const fetchQuiz = async () => {
    setLoading(true);
    const myQuiz = await getQuiz(params.id);
    setQuiz(myQuiz);
    setLoading(false);
    setQuizTitle(myQuiz.title.trim().split("\\n").join("\n"));
  };

  const onSuccess = () => {
    // Perform this everytime an action happens
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

  const onDelete = async () => {
    await deleteQuiz(quiz._id);
    router.push("/");
  };

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen py-10 px-4 max-w-4xl flex flex-col gap-4 items-start">
      <div className="text-sm breadcrumbs text-gray-400">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
      {isLoading && <p>Loading your quiz...</p>}

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
              onCancel={() => setShowEditTitle(false)}
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

          <DeleteButton onDelete={onDelete} deleteText={"quiz"} />
        </>
      )}
    </main>
  );
};

export default QuizPage;
