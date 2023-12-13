"use client";
import getQuestion from "@/app/api_functions/get_question";
import useTokenVerification from "@/app/hooks/useTokenVerification";
import { Question } from "@/app/utils/types";
import { SyntheticEvent, useEffect, useState } from "react";

const QuestionPage = ({ params }: { params: { id: string } }) => {
  useTokenVerification();

  const [question, setQuestion] = useState({} as Question);

  const [showEditTitle, setShowEditTitle] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(" ");

  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const [answer, setAnswer] = useState("");

  const onEditQuestion = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const fetchQuestion = async () => {
    const myQuestion = await getQuestion(params.id);
    setQuestion(myQuestion);
    setQuestionTitle(myQuestion.title.trim().split("\\n").join("\n")); // update the question title
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

      <button
        onClick={() => setShowEditTitle(!showEditTitle)}
        className="p-2 text-slate-950 bg-yellow-400"
      >
        Edit question title
      </button>

      {showEditTitle && (
        <form
          className="p-4 border border-solid border-yellow-400 flex flex-col gap-4 w-full"
          onSubmit={(e) => onEditQuestion(e)}
        >
          <legend>Add a new question</legend>
          <label className="flex flex-col gap-4">
            Question title
            <textarea
              rows={10}
              defaultValue={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="text-slate-950"
            ></textarea>
          </label>

          <button type="submit">Add question</button>
        </form>
      )}
    </main>
  );
};

export default QuestionPage;
