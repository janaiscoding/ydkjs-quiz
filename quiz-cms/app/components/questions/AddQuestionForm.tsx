import createQuestion from "@/app/api_functions/questions/create_question";
import { QuizzesContext } from "@/app/context/quizzesContext";
import { formatToTemplateLiteral } from "@/app/utils/stringFormatters";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { IoCheckboxOutline } from "react-icons/io5";

const AddQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const quizzes = useContext(QuizzesContext);
  const [parentQuiz, setParentQuiz] = useState("");
  const router = useRouter();

  const onSubmitQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (parentQuiz.includes("Select")) {
      // add a new error that no quiz was selected
      return;
    }
    if (question && parentQuiz) {
      createQuestion(parentQuiz, formatToTemplateLiteral(question), onSuccess);
    }
  };

  const onSuccess = (new_question_id: string) => {
    setQuestion("");
    setParentQuiz("");
    console.log("redirect..."); // add a visual effect here
    setTimeout(() => {
      router.push(`/questions/${new_question_id}`);
    }, 100);
  };

  return (
    <form
      className="flex flex-col gap-4 px-4 md:min-w-[30rem]"
      onSubmit={(e) => onSubmitQuestion(e)}
    >
      <label className="flex flex-col gap-2 hover:cursor-pointer">
        <span className="md:text-2xl text-indigo-400">Add a new question</span>
        <textarea
          rows={10}
          onChange={(e) => setQuestion(e.target.value)}
          className="text-neutral-50 bg-neutral-800 border border-indigo-400 p-4"
        ></textarea>
      </label>
      <label className="text-slate-950 flex flex-col gap-2 hover:cursor-pointer">
        <span className="text-indigo-400">Select parent quiz</span>
        <select onChange={(e) => setParentQuiz(e.target.value)}>
          <option>Select parent quiz for this question</option>
          {quizzes.quizzes?.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>
              {quiz.title}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="self-center flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
      >
        <IoCheckboxOutline />
        Add and go to question page
      </button>
    </form>
  );
};

export default AddQuestionForm;
