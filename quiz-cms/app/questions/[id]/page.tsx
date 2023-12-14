"use client";

import createAnswer from "@/app/api_functions/answers/create_answer";
import deleteQuestion from "@/app/api_functions/questions/delete_question";
import editQuestionTitle from "@/app/api_functions/questions/edit_question_title";
import getQuestion from "@/app/api_functions/questions/get_question";
import DeletePopup from "@/app/components/DeletePopup";
import EditTitleForm from "@/app/components/EditTitleForm";
import ToggleButton from "@/app/components/ToggleButton";
import AddAnswerForm from "@/app/components/answers/AddAnswerForm";
import QuestionAnswers from "@/app/components/answers/AllAnswers";
import useTokenAuth from "@/app/hooks/useTokenAuth";
import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import PopupWrapper from "@/app/utils/PopupWrapper";
import {
  formatToMarkdown,
  formatToTemplateLiteral,
} from "@/app/utils/stringFormatters";

import { Answer, Question } from "@/app/utils/types";
import { useRouter } from "next/navigation";

import { SyntheticEvent, useEffect, useState } from "react";

const QuestionPage = ({ params }: { params: { id: string } }) => {
  useTokenAuth();
  const router = useRouter();
  // Current page question, will be fetched
  const [question, setQuestion] = useState({} as Question);
  const [answers, setAnswers] = useState([] as Answer[]);
  // Edit question title
  const [questionTitle, setQuestionTitle] = useState(" ");
  // New answer content
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Loaders, state togglers
  const [isLoading, setLoading] = useState(true);
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
    setAnswers(myQuestion.answers);
    setLoading(false);
  };

  const onDelete = () => {
    //delete question
    deleteQuestion(question._id, onSuccessDelete);
    //redirect to parent quiz
  };
  const onSuccessDelete = () => {
    //show delete success popup
    setTimeout(() => {
      router.push(`/quizzes/${question?.parent_quiz}`);
    }, 1000);
  };

  const onSuccess = () => {
    fetchQuestion();
    setShowEditTitle(false);
    setShowAddAnswer(false);
    setAnswer("");
  };

  const onCancelAddAnswer = () => setShowAddAnswer(false);
  const onCancelEditTitle = () => setShowEditTitle(false);
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

          <div className="md:text-xl text-yellow-400">
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
              target={showDelete}
              toggler={setShowDelete}
              buttonText="Delete question"
            />
          </div>

          {/* DISPLAY ALL QUESTIONS ANSWERS */}
          <QuestionAnswers answers={answers} onRefetch={onSuccess} />

          {/* EDIT QUESTION POPUP FORM */}
          <PopupWrapper isShown={showEditTitle}>
            <EditTitleForm
              defaultTitle={questionTitle}
              legend="question"
              setTitle={setQuestionTitle}
              onSubmit={onEditQuestion}
              onCancel={onCancelEditTitle}
            />
          </PopupWrapper>

          {/* DELETE QUESTION POPUP  */}
          <PopupWrapper isShown={showDelete}>
            <DeletePopup
              onDelete={onDelete}
              onCancel={() => setShowDelete(false)}
            />
          </PopupWrapper>

          {/* ADD ANSWER POPUP FORM */}
          <PopupWrapper isShown={showAddAnswer}>
            <AddAnswerForm
              setAnswer={setAnswer}
              setIsCorrect={setIsCorrect}
              onSubmit={onAddAnswer}
              onCancel={onCancelAddAnswer}
            />
          </PopupWrapper>
        </>
      )}
    </main>
  );
};

export default QuestionPage;
