import { Question } from "@/app/utils/types";
import QuestionWrapper from "./QuestionWrapper";

const QuizQuestions = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      {questions.length === 0 && <p> No questions yet </p>}
      {questions.length > 0 && (
        <div className="flex flex-col gap-2">
          {questions.map((q, idx) => (
            <QuestionWrapper question={q} idx={idx} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
