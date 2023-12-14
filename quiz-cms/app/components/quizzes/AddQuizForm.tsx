import { SetStateAction, SyntheticEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";

type AddQuestionFormProps = {
  setQuizTitle: React.Dispatch<SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => void;
};

const AddQuizForm = ({ setQuizTitle, onSubmit }: AddQuestionFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-200/20 flex flex-col gap-4 w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Add a new quiz</legend>
      <label className="flex flex-col gap-4">
        Quiz title
        <input
          onChange={(e) => setQuizTitle(e.target.value)}
          className="text-slate-950 h-10"
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
