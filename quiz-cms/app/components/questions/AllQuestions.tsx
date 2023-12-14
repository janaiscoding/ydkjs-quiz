import { Question } from "@/app/utils/types";

const QuizQuestions = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      {questions.length === 0 && <p> No questions yet </p>}
      {questions.length > 0 && (
        <div className="flex flex-col gap-2">
          {questions.map((q, idx) => (
            <a className="link" href={`/questions/${q._id}`} key={q._id}>
              {idx + 1}. {q.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};


export default QuizQuestions;