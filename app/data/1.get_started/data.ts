import { TQuestion } from "@/app/utils/types";
import uniqid from "uniqid";
const getStartedArray: TQuestion[] = [
  {
    id: uniqid(),
    title: "What is the output of the following JavaScript code?\n\n```javascript\nfunction sayHello() {\n    console.log('Hello, World!');\n}\n\nsayHello();\n```",
    code: "let a = b * 2;",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctAnswer: "answer 1",
    isCompleted: false,
    userSelectedCorrect: false,
  },
  {
    id: uniqid(),
    title: "Title of question number 2",
    code: "`a = b * 2;`",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctAnswer: "answer 1",
    isCompleted: false,
    userSelectedCorrect: false,
  },
];

export default getStartedArray;
