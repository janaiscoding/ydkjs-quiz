import { Answer } from "@/app/utils/types";
import AnswerWrapper from "./AnswerWrapper";

const QuestionAnswers = ({
  answers,
  onRefetch,
}: {
  answers: Answer[];
  onRefetch: () => void;
}) => {
  return (
    <div className="w-full">
      {answers.length === 0 && <p> No answers yet, let&apos;s add one </p>}
      {answers.length > 0 && (
        <div className="flex flex-col gap-2 ">
          {answers.map((ans, idx) => (
            <AnswerWrapper
              idx={idx + 1}
              answer={ans}
              key={idx}
              onSucces={onRefetch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionAnswers;
