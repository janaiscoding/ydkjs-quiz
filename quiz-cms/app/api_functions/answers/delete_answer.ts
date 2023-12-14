import { getJwtToken } from "@/app/utils/auth";

const deleteAnswer = (answer_id: string, onSuccess: () => void) => {
  fetch(`https://js-quiz-api.fly.dev/answers/${answer_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        onSuccess();
      } else {
        console.log(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default deleteAnswer;
