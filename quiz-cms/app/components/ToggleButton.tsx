import { SetStateAction } from "react";
import { MdEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";

type ToggleButtonProps = {
  target: boolean;
  toggler: React.Dispatch<SetStateAction<boolean>>;
  buttonText: string;
};

const ToggleButton = ({ target, toggler, buttonText }: ToggleButtonProps) => {

  return (
    <button
      onClick={() => toggler(!target)}
      className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-yellow-400"
    >
      {buttonText.charAt(0) === "E" && <MdEdit />}
      {buttonText.charAt(0) === "A" && <IoIosAdd />}
      {buttonText.charAt(0) === "S" && <FaRegEye />}
      {buttonText}
    </button>
  );
};

export default ToggleButton;
