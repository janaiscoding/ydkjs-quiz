import { getJwtToken } from "@/app/utils/auth";
import { quizzesAPI } from "@/app/utils/endpoints";

const createQuiz = (title: string, onSuccess: (quiz_id: string) => void) => {
  console.log(title);
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
      if (data.message) {
        onSuccess(data.newQuiz._id);
      } else {
        //handle error --- quiz title too long
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createQuiz;
