import { TQuestion } from "@/app/utils/types";
import uniqid from "uniqid";
const getStartedArray: TQuestion[] = [
  {
    id: uniqid(),
    title: "How much is `x+y`",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctAnswer: "answer 1",
    isCompleted: false,
    userSelectedCorrect: false,
  },
  {
    id: uniqid(),
    title: "Title of question number 2",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctAnswer: "answer 1",
    isCompleted: false,
    userSelectedCorrect: false,
  },
];

export default getStartedArray;
