import { SetStateAction } from "react";
import { Quiz } from "../utils/types";
import { getJwtToken } from "../utils/auth";
import { quizzesAPI } from "../utils/endpoints";

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
