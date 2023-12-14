import { IoMdClose } from "react-icons/io";
const CancelButton = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <button
      onClick={onCancel}
      className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-red-100"
    >
      <IoMdClose />
      <p>No, go back</p>
    </button>
  );
};

export default CancelButton;
