"use client";
import createAnswer from "@/app/api_functions/create_answer";
import editQuestionTitle from "@/app/api_functions/edit_question_title";
import getQuestion from "@/app/api_functions/get_question";
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
    setQuestionTitle(myQuestion.title.trim().split("\\n").join("\n")); // update the question title
    console.log(myQuestion);
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
          <legend>Edit question title</legend>
          <label className="flex flex-col gap-4">
            Question title
            <textarea
              rows={10}
              defaultValue={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="text-slate-950"
            ></textarea>
          </label>

          <button type="submit">Save question title</button>
        </form>
      )}

      <button
        onClick={() => setShowAddAnswer(!showAddAnswer)}
        className="p-2 text-slate-950 bg-yellow-400"
      >
        Add new answer
      </button>
      {showAddAnswer && (
        <form
          className="p-4 border border-solid border-yellow-400 flex flex-col gap-4 w-full text-slate-50"
          onSubmit={(e) => onAddAnswer(e)}
        >
          <legend>Add a new answer</legend>
          <div>
            <label className="flex flex-col">
              Answer
              <textarea
                className="text-slate-950"
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
            </label>
            <label className="flex gap-2">
              Is correct?
              <input
                className="text-slate-950"
                type="checkbox"
                onChange={(e) => setIsCorrect(e.target.checked)}
              ></input>
            </label>
          </div>
          <button type="submit">Add answer</button>
        </form>
      )}
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="p-2 text-slate-950 bg-yellow-400"
      >
        Show question answers
      </button>
      {showAnswers && (
        <div className="max-w-md">
          {question?.answers.length === 0 && <p> No questions yet </p>}
          {question?.answers.length > 0 && (
            <div className="flex flex-col gap-2">
              {question?.answers?.map((a, idx) => (
                <div className="text-blue-400 hover:text-blue-500" key={a._id}>
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
