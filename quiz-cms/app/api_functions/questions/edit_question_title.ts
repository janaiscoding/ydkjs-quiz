import { getJwtToken } from "@/app/utils/auth";

const editQuestionTitle = async (
  question_id: string,
  title: string,
  onSuccess: () => void
) => {
  const res = await fetch(`https://js-quiz-api.fly.dev/questions/${question_id}`, {
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

export default editQuestionTitle;
