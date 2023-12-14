import { Quiz } from "@/app/utils/types";
import { getJwtToken } from "@/app/utils/auth";
import { quizzesAPI } from "@/app/utils/endpoints";

const getQuizzes = async () => {
  let quizzes: Quiz[];
  await fetch(quizzesAPI, {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      quizzes = data.quizzes;
    })
    .catch((err) => {
      console.log(err);
    });

  return quizzes!;
};

export default getQuizzes;
