import { SetStateAction, SyntheticEvent } from "react";

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

      <button type="submit">Add question</button>
    </form>
  );
};

export default AddQuestionForm;
