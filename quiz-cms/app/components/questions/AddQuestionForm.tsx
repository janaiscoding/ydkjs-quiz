import { SetStateAction, SyntheticEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";

type AddQuestionFormProps = {
  setQuestion: React.Dispatch<SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => void;
  onCancel: () => void;
};

const AddQuestionForm = ({
  setQuestion,
  onSubmit,
  onCancel,
}: AddQuestionFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-200/20 flex flex-col gap-4 w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Add a new question</legend>
      <label className="flex flex-col gap-4">
        Question title
        <textarea
          rows={10}
          onChange={(e) => setQuestion(e.target.value)}
          className="text-slate-950"
        ></textarea>
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
        >
          <IoCheckboxOutline />
          Add new question
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-red-100"
        >
          <IoMdClose />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddQuestionForm;
