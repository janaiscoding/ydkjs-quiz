import { SetStateAction, SyntheticEvent } from "react";

type EditTitleFormProps = {
  defaultTitle: string;
  legend: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => void;
};

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
      <legend>Edit {legend} Title</legend>
      <label className="flex flex-col gap-4">
        {legend} Title
        <input
          defaultValue={defaultTitle}
          onChange={(e) => setTitle(e.target.value)}
          className="text-slate-950"
        ></input>
      </label>

      <button type="submit">Save title</button>
    </form>
  );
};

export default EditTitleForm;
