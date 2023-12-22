import { useEffect, useState } from "react";
import { Question, Quiz } from "../utils/types";
import getQuiz from "../api_and_fetchers/get_quiz";

const useQuiz = (id: string) => {
  const [isLoading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [questions, setQuestions] = useState<Question[]>([] as Question[]);

  const fetchQuiz = async () => {
    const data = await getQuiz(id);
    setQuiz(data);
    setQuestions(data.questions);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    quiz,
    questions,
  };
};

export default useQuiz;
