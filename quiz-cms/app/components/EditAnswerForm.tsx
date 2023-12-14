import { SetStateAction, SyntheticEvent } from "react";
import { IoMdClose } from "react-icons/io";

type EditTitleFormProps = {
  defaultAnswer: string;
  defaultCorrect: boolean;
  setAnswer: React.Dispatch<SetStateAction<string>>;
  setIsCorrect: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: (e: SyntheticEvent) => void;
  onCancel: () => void;
  onDeleteAnswer: () => void;
};
import { IoCheckboxOutline } from "react-icons/io5";
import DeleteButton from "./DeleteButton";

const EditAnswerForm = ({
  defaultAnswer,
  defaultCorrect,
  setAnswer,
  setIsCorrect,
  onSubmit,
  onCancel,
  onDeleteAnswer,
}: EditTitleFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-200/20 flex flex-col gap-4 w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend className="flex justify-between">
        <span>Edit answer</span>

        <button
          onClick={onCancel}
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-red-100"
        >
          <IoMdClose />
        </button>
      </legend>
      <label className="flex flex-col gap-2">
        Your current answer
        <textarea
          defaultValue={defaultAnswer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={3}
          className="text-slate-950 p-2"
        ></textarea>
      </label>
      <label className="cursor-pointer flex gap-1 items-center text-neutral-50 hover:text-green-300">
        <span>Is correct?</span>
        <input
          type="checkbox"
          className="checkbox checkbox-success"
          checked={defaultCorrect}
          onChange={(e) => setIsCorrect(e.target.checked)}
        />
      </label>
      <div className="flex gap-4 justify-between">
        <button
          type="submit"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-green-400"
        >
          <IoCheckboxOutline />
          Save answer
        </button>

        <DeleteButton onDelete={onDeleteAnswer} deleteText={"answer"} />
      </div>
    </form>
  );
};

export default EditAnswerForm;
