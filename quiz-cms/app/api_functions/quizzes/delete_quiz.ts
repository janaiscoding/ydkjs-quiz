import { getJwtToken } from "@/app/utils/auth";

const deleteQuiz = async (quiz_id: string) => {
  const res = await fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
  if (res.ok) {
    //success
  }
};

export default deleteQuiz;
