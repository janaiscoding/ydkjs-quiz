import { ReactNode } from "react";

// Used for certain containers: on quiz, questions, answers, to highlight them nicely 
const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-sky-950 p-4 flex flex-col gap-4">
      {children}
    </div>
  );
};

export default ContentWrapper;
