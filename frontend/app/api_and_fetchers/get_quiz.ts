import { Quiz } from "@/app/utils/types";

const getQuiz = async (quiz_id: string) => {
  return fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

export default getQuiz;
