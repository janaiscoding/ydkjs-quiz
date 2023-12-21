import { useContext, useEffect, useState } from "react";
import { QuizzesContext } from "../context/QuizzesContext";
import getQuizzes from "../api_and_fetchers/get_quizzes";

export const useQuizzes = () => {
  const quizzesContext = useContext(QuizzesContext);

  const fetchData = async () => {
    const appQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(appQuizzes);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return quizzesContext.quizzes;
};
