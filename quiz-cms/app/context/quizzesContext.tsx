"use client";
import React, { useState, createContext } from "react";
import { Quiz } from "../utils/types";

type QuizzesContextProviderProps = {
  children: React.ReactNode;
};

type QuizzesContextType = {
  quizzes: Quiz[] | null;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[] | null>>;
};

export const QuizzesContext = createContext<QuizzesContextType>(
  {} as QuizzesContextType
);

export const QuizzesContextProvider = ({
  children,
}: QuizzesContextProviderProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>([] as Quiz[]);

  return (
    <QuizzesContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};
