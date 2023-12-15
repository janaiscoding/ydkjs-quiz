import { getJwtToken } from "@/app/utils/auth";

const deleteQuiz = (quiz_id: string, onSuccess: () => void) => {
  fetch(`https://js-quiz-api.fly.dev/quizzes/${quiz_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message.includes("deleted")) {
        onSuccess();
      } else {
        console.log(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default deleteQuiz;
