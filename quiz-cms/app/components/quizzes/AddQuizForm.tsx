import createQuiz from "@/app/api_functions/quizzes/create_quiz";
import getQuizzes from "@/app/api_functions/quizzes/get_quizzes";
import { QuizzesContext } from "@/app/context/quizzesContext";
import { ViewContext } from "@/app/context/viewContext";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useState } from "react";

import { IoCheckboxOutline } from "react-icons/io5";

const AddQuizForm = () => {
  const router = useRouter();
  const quizzesContext = useContext(QuizzesContext);
  const viewContext = useContext(ViewContext);

  // New quiz title
  const [title, setTitle] = useState("");
  // Submit a new quiz
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createQuiz(title, onSuccessToQuizPage);
  };

  // Refetch after new quiz success + clear form
  const onSuccessToQuizPage = (quiz_id: string) => {
    setTitle("");
    router.push(`quizzes/${quiz_id}`);
  };

  const handleSubmitToHomepage = () => {
    createQuiz(title, (quiz_id) => {
      onSuccessToHomepage();
    });
  };

  // Fetch and set context and go to homepage
  const onSuccessToHomepage = async () => {
    setTitle("");
    viewContext.setView("quizzes");
    const myQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(myQuizzes);
  };

  return (
    <form
      className="flex flex-col items-start gap-4 w-full min-w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend className="text-indigo-400 text-2xl">Add a new quiz</legend>
      <label className="flex flex-col gap-4">
        <span className="hidden">Quiz title</span>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="text-slate-950 h-10 p-4 w-full"
        />
      </label>

      <button
        type="button"
        onClick={handleSubmitToHomepage}
        className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
      >
        <IoCheckboxOutline />
        Add and go back to home
      </button>

      <button
        type="submit"
        className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
      >
        <IoCheckboxOutline />
        Add and go to quiz page
      </button>
    </form>
  );
};

export default AddQuizForm;
