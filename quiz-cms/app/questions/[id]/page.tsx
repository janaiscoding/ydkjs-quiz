"use client";

import createAnswer from "@/app/api_functions/answers/create_answer";
import deleteQuestion from "@/app/api_functions/questions/delete_question";
import editQuestionTitle from "@/app/api_functions/questions/edit_question_title";
import getQuestion from "@/app/api_functions/questions/get_question";

import AddAnswerForm from "@/app/components/AddAnswerForm";
import AnswerWrapper from "@/app/components/AnswerWrapper";
import DeleteButton from "@/app/components/DeleteButton";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";
import useTokenAuth from "@/app/hooks/useTokenAuth";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import PopupWrapper from "@/app/utils/PopupWrapper";
import {
  formatToMarkdown,
  formatToTemplateLiteral,
} from "@/app/utils/stringFormatters";

import { Question } from "@/app/utils/types";
import { useRouter } from "next/navigation";

import { SyntheticEvent, useEffect, useState } from "react";

const QuestionPage = ({ params }: { params: { id: string } }) => {
  useTokenAuth();
  const router = useRouter();
  // Current page question, will be fetched
  const [question, setQuestion] = useState({} as Question);
  // Edit question title
  const [questionTitle, setQuestionTitle] = useState(" ");
  // New answer content
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Loaders, state togglers
  const [isLoading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const onEditQuestion = (e: SyntheticEvent) => {
    e.preventDefault();
    const editTitle = formatToTemplateLiteral(questionTitle);
    editQuestionTitle(params.id, editTitle, onSuccess);
  };

  const onAddAnswer = (e: SyntheticEvent) => {
    e.preventDefault();
    const dbAnswer = formatToTemplateLiteral(answer);
    createAnswer(params.id, dbAnswer, isCorrect, onSuccess);
  };

  const fetchQuestion = async () => {
    setLoading(true);
    const myQuestion = await getQuestion(params.id);
    setQuestion(myQuestion);
    const markdownQuestion = formatToMarkdown(myQuestion.title);
    setQuestionTitle(markdownQuestion);
    setLoading(false);
  };

  const onDelete = () => {
    //delete question
    deleteQuestion(question._id);
    //redirect to parent quiz
    router.push(`/quizzes/${question?.parent_quiz}`);
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
      {/* BREADCRUMBS */}
      <div className="text-sm breadcrumbs text-gray-400">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href={`/quizzes/${question?.parent_quiz}`}>Parent quiz</a>
          </li>
        </ul>
      </div>

      {/* LOADING EFFECT */}
      {isLoading && <p>Loading your question...</p>}

      {!isLoading && (
        <>
          <p>You are now editting...</p>
          {/* QUESTION WITH SYNTAX HIGHLIGHT  */}

          <div className="md:text-2xl text-yellow-400">
            <MarkdownWrapper content={formatToMarkdown(question.title)} />
          </div>

          {/* CONTROLLER BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <ToggleButton
              target={showEditTitle}
              toggler={setShowEditTitle}
              buttonText="Edit title"
            />
            <ToggleButton
              target={showAddAnswer}
              toggler={setShowAddAnswer}
              buttonText="Add answer"
            />

            <ToggleButton
              target={showAnswers}
              toggler={setShowAnswers}
              buttonText="Show answers"
            />
            <ToggleButton
              target={showDelete}
              toggler={setShowDelete}
              buttonText="Delete question"
            />
          </div>

          {/* EDIT QUESTION POPUP FORM */}
          {showEditTitle && (
            <PopupWrapper>
              <EditTitleForm
                defaultTitle={questionTitle}
                legend="question"
                setTitle={setQuestionTitle}
                onSubmit={onEditQuestion}
                onCancel={() => setShowEditTitle(false)}
              />
            </PopupWrapper>
          )}

          {/* ADD ANSWER POPUP FORM */}
          {showAddAnswer && (
            <PopupWrapper>
              <AddAnswerForm
                setAnswer={setAnswer}
                setIsCorrect={setIsCorrect}
                onSubmit={onAddAnswer}
                onCancel={() => setShowAddAnswer(false)}
              />
            </PopupWrapper>
          )}

          {/* DISPLAY ALL QUESTIONS ANSWERS */}
          {showAnswers && (
            <div className="w-full">
              {question?.answers.length === 0 && <p> No questions yet </p>}
              {question?.answers.length > 0 && (
                <div className="flex flex-col gap-2 ">
                  {question?.answers?.map((ans, idx) => (
                    <AnswerWrapper
                      idx={idx + 1}
                      answer={ans}
                      key={idx}
                      onSucces={onSuccess}
                      setShowAnswers={setShowAnswers}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default QuestionPage;
