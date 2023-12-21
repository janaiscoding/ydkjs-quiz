import { quizzesAPI } from "../utils/endpoints";
import { Quiz } from "../utils/types";

const getQuizzes = async () => {
  let quizzes: Quiz[];
  
  await fetch(quizzesAPI)
    .then((res) => res.json())
    .then((data) => {
      if (data.quizzes) {
        quizzes = data.quizzes;
      } else {
        //handle error
      }
    })
    .catch((err) => console.log(err));

   return quizzes!; 
};

export default getQuizzes;
