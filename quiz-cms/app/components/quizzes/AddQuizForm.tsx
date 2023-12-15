import createQuiz from "@/app/api_functions/quizzes/create_quiz";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

import { IoCheckboxOutline } from "react-icons/io5";

const AddQuizForm = () => {
  const router = useRouter();
  // New quiz title
  const [title, setTitle] = useState("");
  // Submit a new quiz
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(title)
    createQuiz(title, onSuccess);
  };

  // Refetch after new quiz success + clear form
  const onSuccess = (quiz_id: string) => {
    setTitle("");
    router.push(`quizzes/${quiz_id}`);
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
          className="text-slate-950 h-10 p-4"
        />
      </label>

      <button
        type="submit"
        className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
      >
        <IoCheckboxOutline />
        Add quiz
      </button>
    </form>
  );
};

export default AddQuizForm;
