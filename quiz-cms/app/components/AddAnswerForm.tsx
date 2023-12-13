import { SetStateAction, SyntheticEvent } from "react";

type AddAnswerFormProps = {
  setAnswer: React.Dispatch<SetStateAction<string>>;
  setIsCorrect: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: (e: SyntheticEvent) => void;
};

const AddAnswerForm = ({
  setAnswer,
  setIsCorrect,
  onSubmit,
}: AddAnswerFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-400 flex flex-col gap-4 w-full text-slate-50"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Add a new answer</legend>
      <div>
        <label className="flex flex-col">
          Answer
          <textarea
            className="text-slate-950"
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </label>
        <label className="flex gap-2">
          Is correct?
          <input
            className="text-slate-950"
            type="checkbox"
            onChange={(e) => setIsCorrect(e.target.checked)}
          ></input>
        </label>
      </div>
      <button type="submit">Add answer</button>
    </form>
  );
};

export default AddAnswerForm;
