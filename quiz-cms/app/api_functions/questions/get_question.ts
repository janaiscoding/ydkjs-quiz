import { Question } from "@/app/utils/types";

const getQuestion = async (question_id: string) => {
  let question: Question;
  await fetch(`https://js-quiz-api.fly.dev/questions/${question_id}`)
    .then((res) => res.json())
    .then((data) => {
      question = data.question;
    })
    .catch((err) => console.log(err));

  return question!;
};

export default getQuestion;
