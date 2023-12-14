import { SetStateAction, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

type ToggleButtonProps = {
  target: boolean;
  toggler: React.Dispatch<SetStateAction<boolean>>;
  buttonText: string;
};

const ToggleButton = ({ target, toggler, buttonText }: ToggleButtonProps) => {
  const [type, setType] = useState("");

  useEffect(() => {
    if (buttonText.charAt(0) === "E") {
      setType("edit");
    } else if (buttonText.charAt(0) === "A") {
      setType("add");
    } else if (buttonText.charAt(0) === "S") {
      setType("show");
    } else {
      setType("delete");
    }
  }, [buttonText]);
  return (
    <button
      onClick={() => toggler(!target)}
      className={`flex gap-1 items-center justify-center p-2 text-slate-950 ${
        type === "add" && "bg-green-400"
      }
      ${type === "edit" && "bg-yellow-200"}
      ${type === "show" && "bg-gray-200"}
      ${type === "delete" && "bg-red-200"}
      `}
    >
      {type === "edit" && <MdEdit />}
      {type === "edit" && buttonText}

      {type === "add" && <IoIosAdd />}
      {type === "add" && buttonText}

      {type === "delete" && <CiWarning />}
      {type === "delete" && buttonText}

      {type === "show" && !target && <FaRegEye />}
      {type === "show" && !target && buttonText}

      {type === "show" && target && <FaEyeSlash />}
      {type === "show" && target && buttonText.replace("Show", "Hide")}
    </button>
  );
};

export default ToggleButton;
