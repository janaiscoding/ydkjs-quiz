import { SetStateAction, SyntheticEvent } from "react";

type EditTitleFormProps = {
  defaultTitle: string;
  legend: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => void;
};
import { IoCheckboxOutline } from "react-icons/io5";
const EditTitleForm = ({
  defaultTitle,
  legend,
  setTitle,
  onSubmit,
}: EditTitleFormProps) => {
  return (
    <form
      className="p-4 border border-solid border-yellow-400 flex flex-col gap-4 w-full"
      onSubmit={(e) => onSubmit(e)}
    >
      <legend>Edit {legend} title</legend>
      <label className="flex flex-col gap-2">
        {legend} title
        <textarea
          defaultValue={defaultTitle}
          onChange={(e) => setTitle(e.target.value)}
          rows={legend === "question" ? 10 : 3}
          className="text-slate-950 p-2"
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

export default EditTitleForm;
