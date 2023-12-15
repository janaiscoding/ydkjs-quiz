import { getJwtToken } from "@/app/utils/auth";

const createQuestion = (
  quiz_id: string,
  title: string,
  onSuccess: () => void
) => {
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
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createQuestion;
