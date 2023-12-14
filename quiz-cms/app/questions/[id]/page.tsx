"use client";
import createAnswer from "@/app/api_functions/create_answer";
import editQuestionTitle from "@/app/api_functions/edit_question_title";
import getQuestion from "@/app/api_functions/get_question";
import AddAnswerForm from "@/app/components/AddAnswerForm";
import DeleteButton from "@/app/components/DeleteButton";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";
import useTokenAuth from "@/app/hooks/useTokenAuth";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import {
  formatToMarkdown,
  formatToTemplateLiteral,
} from "@/app/utils/stringFormatters";

import { Question } from "@/app/utils/types";

import { SyntheticEvent, useEffect, useState } from "react";

const QuestionPage = ({ params }: { params: { id: string } }) => {
  useTokenAuth();

  const [isLoading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [question, setQuestion] = useState({} as Question);

  const [showEditTitle, setShowEditTitle] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(" ");

  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const onEditQuestion = (e: SyntheticEvent) => {
    e.preventDefault();
    editQuestionTitle(
      params.id,
      formatToTemplateLiteral(questionTitle),
      onSuccess
    );
  };

  const onAddAnswer = (e: SyntheticEvent) => {
    e.preventDefault();
    createAnswer(
      params.id,
      formatToTemplateLiteral(answer),
      isCorrect,
      onSuccess
    );
  };

  const fetchQuestion = async () => {
    setLoading(true);
    const myQuestion = await getQuestion(params.id);
    setQuestion(myQuestion);

    setQuestionTitle(formatToMarkdown(myQuestion.title));
    setLoading(false);
  };

  const onSuccess = () => {
    fetchQuestion();
    setShowEditTitle(false);
    setShowAddAnswer(false);
    setShowAnswers(false);
    setAnswer("");
  };
  const onDelete = () => {
    //delete question
    //redirect to parent quiz
  };
  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen py-10 px-4 max-w-4xl flex flex-col gap-4 items-start">
      <div className="flex gap-1">
        <a href="/" className="text-neutral-400 hover:text-blue-500 underline">
          Home
        </a>
        <a
          href={`/quizzes/${question?.parent_quiz}`}
          className="text-neutral-400 hover:text-blue-500 underline"
        >
          Parent Quiz
        </a>
      </div>
      {isLoading && <p>Loading your question...</p>}
      {!isLoading && (
        <>
          <div className="text-2xl text-yellow-400">
            <MarkdownWrapper content={formatToMarkdown(question.title)} />
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
                  {question?.answers?.map((ans, idx) => (
                    <div className="" key={ans._id}>
                      {idx + 1}. {formatToMarkdown(ans.answer)} ... +edit button
                      ... +delete button
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <DeleteButton onDelete={onDelete} />
        </>
      )}
    </main>
  );
};

export default QuestionPage;
