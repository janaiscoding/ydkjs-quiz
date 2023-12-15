import createQuestion from "@/app/api_functions/questions/create_question";
import { QuizzesContext } from "@/app/context/quizzesContext";
import { formatToTemplateLiteral } from "@/app/utils/stringFormatters";
import { FormEvent, useContext, useState } from "react";
import { IoCheckboxOutline } from "react-icons/io5";

const AddQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const quizzes = useContext(QuizzesContext);
  const [parentQuiz, setParentQuiz] = useState("");

  const onAddQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (question && parentQuiz) {
      createQuestion(parentQuiz, formatToTemplateLiteral(question), onSuccess);
    }
  };

  const onSuccess = () => {
    setQuestion("");
    setParentQuiz("");
  };

  return (
    <form
      className="p-4 border border-solid border-yellow-200/20 flex flex-col gap-4 w-full"
      onSubmit={(e) => onAddQuestion(e)}
    >
      <label className="flex flex-col gap-2 hover:cursor-pointer">
        Add a new question
        <textarea
          rows={10}
          onChange={(e) => setQuestion(e.target.value)}
          className="text-slate-950 bg-neutral-100 p-4"
        ></textarea>
      </label>
      <label className="text-slate-950 flex flex-col gap-2 hover:cursor-pointer">
        <span className="text-slate-50">Select parent quiz</span>
        <select onChange={(e) => setParentQuiz(e.target.value)}>
          <option disabled>--Please choose a parent quiz--</option>
          {quizzes.quizzes?.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>
              {quiz.title}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
      >
        <IoCheckboxOutline />
        Add question
      </button>
    </form>
  );
};

export default AddQuestionForm;
