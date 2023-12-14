import { getJwtToken } from "@/app/utils/auth";

const editAnswer = async (
  answer_id: string,
  answer: string,
  isCorrect: boolean,
  onSuccess: () => void
) => {
  fetch(`https://js-quiz-api.fly.dev/answers/${answer_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer, isCorrect }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        onSuccess();
      } else {
        console.log(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default editAnswer;
