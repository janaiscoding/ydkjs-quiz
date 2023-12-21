"use client";

import { createContext, useState } from "react";
import { Quiz } from "../utils/types";

type QuizzesContextType = {
  quizzes: Quiz[] | null;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[] | null>>;
};

export const QuizzesContext = createContext({} as QuizzesContextType);

export const QuizzesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>([] as Quiz[]);

  return (
    <QuizzesContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};
