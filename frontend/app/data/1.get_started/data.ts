
import { TQuestion } from "@/app/utils/types";
import uniqid from "uniqid";
const getStartedArray: TQuestion[] = [
  {
    id: uniqid(),
    title:
      "What is the output of the following JavaScript code?\n\n```javascript\nfunction sayHello() {\n    console.log('Hello, World!');\n}\n\nsayHello();\n```",
    answers: [
      "Will print `'Hello, World!'` to the console.",
      "Will alert `Hello, World!` to the browser.",
      "Will print `Hello, World!` to the console.",
    ],
    correctAnswer: "Will print `Hello, World!` to the console.",
    isCompleted: false,
    userSelectedCorrect: false,
  },
  {
    id: uniqid(),
    title:
      "What will be the value of `yourName` after the re-assignment of `myName` in the following code?\n\n```javascript\nvar myName = 'Kyle';\nvar yourName = myName;\nmyName = 'Frank';\n```",
    answers: ["Frank", "Kyle", "`ReferenceError`"],
    correctAnswer: "Kyle",
    isCompleted: false,
    userSelectedCorrect: false,
  },
];

export default getStartedArray;
