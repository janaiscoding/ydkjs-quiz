import { SetStateAction, SyntheticEvent } from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

type AddAnswerFormProps = {
  setAnswer: React.Dispatch<SetStateAction<string>>;
  setIsCorrect: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: (e: SyntheticEvent) => void;
  onCancel: () => void;
};

const AddAnswerForm = ({
  setAnswer,
  setIsCorrect,
  onSubmit,
  onCancel,
}: AddAnswerFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-200/20 flex flex-col gap-4 w-full text-slate-50"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Add a new answer</legend>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          Answer
          <textarea
            className="text-slate-950"
            rows={6}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </label>

        <label className="cursor-pointer flex gap-1 items-center text-neutral-50 hover:text-green-300">
          <span>Is correct?</span>
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            onChange={(e) => setIsCorrect(e.target.checked)}
          />
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
        >
          <IoCheckboxOutline />
          Add answer
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

export default AddAnswerForm;
