import { getJwtToken } from "@/app/utils/auth";

const createAnswer = async (
  question_id: string,
  answer: string,
  isCorrect: boolean,
  onSuccess: () => void
) => {
  const res = await fetch(
    `https://js-quiz-api.fly.dev/questions/${question_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer, isCorrect }),
    }
  );
  if (res.ok) {
    // handle success
    onSuccess();
  } else {
    //handle error
  }
};

export default createAnswer;
