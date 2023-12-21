type User = {
  _id: string;
  name: string;
  email: string;
  history: History[];
};

type History = {
  _id: string;
  quiz_id: string;
  score: number;
};

type Quiz = {
  _id: string;
  title: string;
  questions: Question[];
};

type Question = {
  _id: string;
  title: string;
  parent_quiz: string;
  answers: Answer[];
};

type Answer = {
  _id: string;
  answer: string;
  isCorrect: boolean;
  parent_question: string;
};
export type { User, Quiz, Question, Answer, History };