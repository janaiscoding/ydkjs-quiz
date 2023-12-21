import { useEffect, useState } from "react";
import { Quiz } from "../utils/types";
import getQuiz from "../api_and_fetchers/get_quiz";

const useQuiz = (id: string) => {
  const [isLoading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);

  const fetchQuiz = async () => {
    const data = await getQuiz(id);
    setQuiz(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    quiz,
  };
};

export default useQuiz;
