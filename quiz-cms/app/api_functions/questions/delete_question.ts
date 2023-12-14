import { getJwtToken } from "@/app/utils/auth";

const deleteQuestion = async (question_id: string, onSuccess: () => void) => {
  const res = await fetch(
    `https://js-quiz-api.fly.dev/questions/${question_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }
  );
  if (res.ok) {
    onSuccess();
  } else {
    //handle error
  }
};

export default deleteQuestion;
