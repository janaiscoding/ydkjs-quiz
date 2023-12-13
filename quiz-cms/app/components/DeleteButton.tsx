import { CiWarning } from "react-icons/ci";
const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <button
      onClick={onDelete}
      className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-red-400"
    >
      <CiWarning />
      Delete quiz
    </button>
  );
};


export default DeleteButton;