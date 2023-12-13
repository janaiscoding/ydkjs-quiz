import { getJwtToken } from "../utils/auth";

const createQuestion = async (
  quiz_id: string,
  title: string,
  onSuccess: () => void
) => {
  const res = await fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (res.ok) {
    // handle success
    onSuccess();
  } else {
    //handle error
  }
};

export default createQuestion;
