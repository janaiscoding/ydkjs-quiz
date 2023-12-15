import { getJwtToken } from "@/app/utils/auth";

const editQuestionParent = async (
  question_id: string,
  parent_quiz: string,
  onSuccess: () => void
) => {
  const res = await fetch(
    `https://js-quiz-api.fly.dev/questions/${question_id}/quiz`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent_quiz }),
    }
  );
  if (res.ok) {
    onSuccess();
  } else {
    //handle error
  }
};

export default editQuestionParent;
