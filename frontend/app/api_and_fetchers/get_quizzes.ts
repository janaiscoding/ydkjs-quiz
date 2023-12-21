import { Dispatch, SetStateAction } from "react";
import { quizzesAPI } from "../utils/endpoints";
import { Quiz } from "../utils/types";

const getQuizzes = async () => {
  return fetch(quizzesAPI)
    .then((res) => res.json())
    .then((data) => {
      if (data.quizzes) {
        return data.quizzes;
        //quizzes = data.quizzes;
      } else {
        console.log(data);
        //handle error
      }
    })
    .catch((err) => console.log(err));
};

export default getQuizzes;
