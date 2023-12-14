import { getJwtToken } from "@/app/utils/auth";

const editAnswer = async (
  answer_id: string,
  answer: string,
  isCorrect: boolean,
  onSuccess: () => void
) => {
  const res = await fetch(`https://js-quiz-api.fly.dev/answers/${answer_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer, isCorrect }),
  });
  if (res.ok) {
    onSuccess();
  }
};

export default editAnswer;
