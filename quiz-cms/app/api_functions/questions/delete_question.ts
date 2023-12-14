import { getJwtToken } from "@/app/utils/auth";

const deleteQuestion = (question_id: string) => {
  fetch(`https://js-quiz-api.fly.dev/questions/${question_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
};

export default deleteQuestion;
