type TQuiz = {
  id: string;
  url: string;
  title: string;
  questions: TQuestion[];
  isCompleted: boolean;
  userScore: number;
  userCorrectQuestions: [];
  userWrongQuestions: [];
};

type TQuestion = {
  id: string;
  title: string;
  answers: string[];
  correctAnswer: string;
  isCompleted: boolean;
  userSelectedCorrect: boolean;
};

export type { TQuestion, TQuiz };
// {
//     id: 0,
//     isCurrent: false,
//     title: "How much is x+y",
//     answers: ["answer 1", "answer 2", "answer 3"],
//     correctAnswer: "answer 1",
//     isCompleted: false,
//     userSelectedCorrect: false,
//   },
