import { Quiz } from "@/app/utils/types";
import { getJwtToken } from "@/app/utils/auth";


const getQuiz = async (quiz_id: string) => {
  let quizz: Quiz;
  await fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`, {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      quizz = data;
    })
    .catch((err) => {
      console.log(err);
    });

  return quizz!;
};

export default getQuiz;
