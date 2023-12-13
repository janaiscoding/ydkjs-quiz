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
export type { User };
