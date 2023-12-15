import { getJwtToken } from "@/app/utils/auth";

const createQuestion = (
  quiz_id: string,
  title: string,
  onSuccess: (new_question_id: string) => void
) => {
  console.log(quiz_id, title);
  fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.newQuestion) {
        onSuccess(data.newQuestion._id);
      } else {
        console.log(data);
        //handle error
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createQuestion;
