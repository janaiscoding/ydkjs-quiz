import { useEffect, useState } from "react";
import { TQuiz } from "../utils/types";
import quiz from "../data/full-quiz-data";
import { useRouter } from "next/navigation";

// Will set the active quiz after "fetching" based on user url browser param
// Will redirect to 404 if quiz doesn't exist
export const useQuizFetcher = (chapter: string) => {
  const [activeQuiz, setActiveQuiz] = useState<TQuiz | undefined>();
  const router = useRouter();

  useEffect(() => {
    // here i will perform fetching from db based on /:id
    const myQuiz = quiz.find((obj) => obj.url === chapter);
    if (!myQuiz) {
      router.push("/404");
    }
    setActiveQuiz(myQuiz);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);
  return activeQuiz;
};
