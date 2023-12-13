"use client";
import createAnswer from "@/app/api_functions/create_answer";
import editQuestionTitle from "@/app/api_functions/edit_question_title";
import getQuestion from "@/app/api_functions/get_question";
import AddAnswerForm from "@/app/components/AddAnswerForm";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";
import useTokenVerification from "@/app/hooks/useTokenVerification";
import { Question } from "@/app/utils/types";

import { SyntheticEvent, useEffect, useState } from "react";

const QuestionPage = ({ params }: { params: { id: string } }) => {
  useTokenVerification();

  const [showAnswers, setShowAnswers] = useState(false);
  const [question, setQuestion] = useState({} as Question);

  const [showEditTitle, setShowEditTitle] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(" ");

  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const onEditQuestion = (e: SyntheticEvent) => {
    e.preventDefault();
    let title = questionTitle.trim().split(/\n/).join("\\n");
    editQuestionTitle(params.id, title, onSuccess);
  };

  const onAddAnswer = (e: SyntheticEvent) => {
    e.preventDefault();
    let formattedAnswer = answer.trim().split(/\n/).join("\\n");
    createAnswer(params.id, formattedAnswer, isCorrect, onSuccess);
  };

  const fetchQuestion = async () => {
    const myQuestion = await getQuestion(params.id);
    setQuestion(myQuestion);
    setQuestionTitle(myQuestion.title.trim().split("\\n").join("\n"));
  };

  const onSuccess = () => {
    fetchQuestion();
    setShowEditTitle(false);
    setShowAddAnswer(false);
    setShowAnswers(false);
    setAnswer("");
  };

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen py-10 px-4 max-w-4xl flex flex-col gap-4 items-start">
      <div className="flex gap-1">
        <a href="/" className="text-neutral-400 hover:text-blue-500 underline">
          Back home
        </a>
        <a
          href={`/quizzes/${question?.parent_quiz}`}
          className="text-neutral-400 hover:text-blue-500 underline"
        >
          Back to parent quiz
        </a>
      </div>
      <div className="text-2xl text-yellow-400">
        You are now editing:
        <p>{question?.title?.trim().split("\\n").join("\n")}</p>
      </div>

      <ToggleButton
        target={showEditTitle}
        toggler={setShowEditTitle}
        buttonText="Edit title"
      />
      {showEditTitle && (
        <EditTitleForm
          defaultTitle={questionTitle}
          legend="question"
          setTitle={setQuestionTitle}
          onSubmit={onEditQuestion}
        />
      )}

      <ToggleButton
        target={showAddAnswer}
        toggler={setShowAddAnswer}
        buttonText="Add answer"
      />

      {showAddAnswer && (
        <AddAnswerForm
          setAnswer={setAnswer}
          setIsCorrect={setIsCorrect}
          onSubmit={onAddAnswer}
        />
      )}

      <ToggleButton
        target={showAnswers}
        toggler={setShowAnswers}
        buttonText="Show answers"
      />
      {showAnswers && (
        <div className="max-w-md">
          {question?.answers.length === 0 && <p> No questions yet </p>}
          {question?.answers.length > 0 && (
            <div className="flex flex-col gap-2">
              {question?.answers?.map((a, idx) => (
                <div className="" key={a._id}>
                  {idx + 1}. {a.answer} ... edit button ... delete button
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default QuestionPage;
