import { SetStateAction } from "react";

type ToggleButtonProps = {
  target: boolean;
  toggler: React.Dispatch<SetStateAction<boolean>>;
  buttonText: string;
};

const ToggleButton = ({ target, toggler, buttonText }: ToggleButtonProps) => {
  return (
    <button
      onClick={() => toggler(!target)}
      className="p-2 text-slate-950 bg-yellow-400"
    >
      {buttonText}
    </button>
  );
};

export default ToggleButton;
