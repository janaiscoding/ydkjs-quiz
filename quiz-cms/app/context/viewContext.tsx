"use client";
import React, { useState, createContext } from "react";

type ViewContextProviderProps = {
  children: React.ReactNode;
};

type ViewContextType = {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export const ViewContext = createContext<ViewContextType>(
  {} as ViewContextType
);

export const ViewContextProvider = ({ children }: ViewContextProviderProps) => {
  const [view, setView] = useState<string>("quizzes");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
