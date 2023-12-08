import getStartedArray from "./1.get_started/data";
import uniqid from "uniqid";
import { TQuiz } from "../utils/types";

const quiz: TQuiz[] = [
  {
    id: uniqid(),
    url: "getting-started",
    title: "Getting Started",
    questions: getStartedArray,
    isCompleted: false,
    userScore: 0,
    userCorrectQuestions: [],
    userWrongQuestions: [],
  },
  //   {
  //     id: uniqid(),
  //     url: "scope-and-closure",
  //     title: "Scope and Closure",
  //     questions: scopeQuestions,
  //   },
];

export default quiz;
