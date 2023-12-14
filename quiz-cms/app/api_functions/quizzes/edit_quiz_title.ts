import { getJwtToken } from "@/app/utils/auth";

const editQuizTitle = async (
  quiz_id: string,
  title: string,
  onSuccess: () => void
) => {
  const res = await fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (res.ok) {
    onSuccess();
  } else {
    //handle error
  }
};

export default editQuizTitle;
