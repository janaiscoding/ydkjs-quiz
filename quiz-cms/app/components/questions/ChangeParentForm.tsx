import editQuestionParent from "@/app/api_functions/questions/edit_question_parent";
import { QuizzesContext } from "@/app/context/quizzesContext";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";

const ChangeParentForm = ({
  question_id,
  onSuccess,
  onCancel,
}: {
  question_id: string;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const quizzesContext = useContext(QuizzesContext);
  const [newParent, setNewParent] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    editQuestionParent(question_id, newParent, onSuccess);
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="p-4 border border-solid border-yellow-200/20 flex flex-col gap-4 w-full"
    >
      <legend className="flex justify-between">
        <span>Change parent quiz</span>
        <button
          onClick={onCancel}
          type="button"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-gray-200"
        >
          <IoMdClose />
        </button>
      </legend>
      <label className="text-slate-950 flex flex-col gap-2 hover:cursor-pointer">
        <select
          onChange={(e) => {
            if (error) {
              setError("");
            }
            setNewParent(e.target.value);
          }}
        >
          <option>Select parent quiz for this question</option>
          {quizzesContext.quizzes?.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>
              {quiz.title}
            </option>
          ))}
        </select>
      </label>

      {/* DISPLAY ERROR MESSAGE */}
      {error && <p className="text-xs text-red-200">Error: {error}</p>}

      {/* SUBMIT BUTTON */}
      <div className="flex justify-between w-full">
        <button
          type="submit"
          className="self-center flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
        >
          <IoCheckboxOutline />
          Save
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-gray-200"
        >
          <IoMdClose />
          Cancel
        </button>
      </div>
    </form>
  );
};
export default ChangeParentForm;
