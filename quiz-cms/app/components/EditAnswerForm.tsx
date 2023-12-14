import { SetStateAction, SyntheticEvent } from "react";

type EditTitleFormProps = {
  defaultAnswer: string;
  setAnswer: React.Dispatch<SetStateAction<string>>;
  setIsCorrect: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: (e: SyntheticEvent) => void;
  onCancel: () => void;
};
import { IoCheckboxOutline } from "react-icons/io5";

const EditAnswerForm = ({
  defaultAnswer,
  setAnswer,
  setIsCorrect,
  onSubmit,
  onCancel,
}: EditTitleFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-400 flex flex-col gap-4 w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Edit answer</legend>
      <label className="flex flex-col gap-2">
        Your current answer
        <textarea
          defaultValue={defaultAnswer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={3}
          className="text-slate-950 p-2"
        ></textarea>
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-yellow-400"
        >
          <IoCheckboxOutline />
          Save answer
        </button>
        <button
          onClick={onCancel}
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-red-400"
        >
          <IoCheckboxOutline />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditAnswerForm;
