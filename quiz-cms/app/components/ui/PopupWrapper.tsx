import { ReactNode } from "react";

const PopupWrapper = ({
  children,
  isShown,
}: {
  children: ReactNode;
  isShown: boolean;
}) => {
  return (
    <div
      className={`${!isShown && "hidden"} ${
        isShown && "flex fixed"
      }  w-full h-full left-0 top-0 overflow-auto bg-neutral-800/90 z-[1000] justify-center items-center`}
    >
      <div className="bg-neutral-950 max-w-md fixed z-[100] w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu">
        {children}
      </div>
    </div>
  );
};

export default PopupWrapper;
