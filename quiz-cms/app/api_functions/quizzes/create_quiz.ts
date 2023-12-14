import { getJwtToken } from "@/app/utils/auth";
import { quizzesAPI } from "@/app/utils/endpoints";

const createQuiz = (title: string, onSuccess: () => void) => {
  fetch(quizzesAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); 
      //handle success
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createQuiz;
