import { SetStateAction, SyntheticEvent } from "react";
import { IoCheckboxOutline } from "react-icons/io5";

type AddQuestionFormProps = {
  setQuestion: React.Dispatch<SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => void;
};

const AddQuestionForm = ({ setQuestion, onSubmit }: AddQuestionFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-400 flex flex-col gap-4 w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Add a new question</legend>
      <label className="flex flex-col gap-4">
        Question title
        <textarea
          onChange={(e) => setQuestion(e.target.value)}
          className="text-slate-950"
        ></textarea>
      </label>

      <button
        type="submit"
        className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-yellow-400"
      >
        <IoCheckboxOutline />
        Save title
      </button>
    </form>
  );
};

export default AddQuestionForm;
