"use client";

import deleteQuiz from "@/app/api_functions/quizzes/delete_quiz";
import editQuizTitle from "@/app/api_functions/quizzes/edit_quiz_title";
import getQuiz from "@/app/api_functions/quizzes/get_quiz";
import DeletePopup from "@/app/components/DeletePopup";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";
import useTokenAuth from "@/app/hooks/useTokenAuth";
import PopupWrapper from "@/app/components/ui/PopupWrapper";

import { Quiz } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import QuestionContainer from "@/app/components/questions/QuestionContainer";

const QuizPage = ({ params }: { params: { id: string } }) => {
  // Auth
  useTokenAuth();
  const router = useRouter();

  // Loaders and togglers on/off
  const [isLoading, setLoading] = useState(true);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // quiz content
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  // state for a new question title
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
    setShowEditTitle(false);
    setQuizTitle("");
  };

  const onEditQuizTitle = (e: SyntheticEvent) => {
    e.preventDefault();
    editQuizTitle(params.id, quizTitle, onSuccess);
  };

  const onDelete = () => {
    //@ts-ignore
    deleteQuiz(quiz.id);
    setShowDelete(false);
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 items-start m-auto">
      {/* LOADING EFFECT */}
      {isLoading && <p>Loading your quiz...</p>}

      {!isLoading && (
        <>
          <p className="text-neutral-400">You are now editting the quiz...</p>
          <h1 className="md:text-2xl text-indigo-400">{quiz.title}</h1>
          {/* CONTROLLER BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <ToggleButton
              target={showEditTitle}
              toggler={setShowEditTitle}
              buttonText="Edit title"
            />

            <ToggleButton
              target={showDelete}
              toggler={setShowDelete}
              buttonText="Delete quiz"
            />
          </div>
          {/* SHOW ALL QUIZ QUESTIONS HERE */}
          <p className="text-neutral-400">Quiz questions:</p>
          {quiz.questions.length === 0 && <p> No questions yet </p>}
          {quiz.questions.length > 0 && (
            <div className="flex flex-col gap-4">
              {quiz.questions.map((q, idx) => (
                <QuestionContainer question={q} idx={idx} key={idx} />
              ))}
            </div>
          )}

          {/* EDIT QUIZ TITLE FORM POPUP  */}
          <PopupWrapper isShown={showEditTitle}>
            <EditTitleForm
              defaultTitle={quizTitle}
              legend={"quiz"}
              setTitle={setQuizTitle}
              onSubmit={onEditQuizTitle}
              onCancel={() => setShowEditTitle(false)}
            />
          </PopupWrapper>

          {/* DELETE QUIZ POPUP */}
          <PopupWrapper isShown={showDelete}>
            <DeletePopup
              onDelete={onDelete}
              onCancel={() => setShowDelete(false)}
            />
          </PopupWrapper>
        </>
      )}
    </div>
  );
};

export default QuizPage;
