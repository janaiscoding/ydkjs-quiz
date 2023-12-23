import MarkdownWrapper from "@/app/utils/MarkdownWrapper";
import { formatToMarkdown } from "@/app/utils/stringFormatters";
import { Answer, Question } from "@/app/utils/types";

type QuizAppProps = {
  idx: number;
  questions: Question[];
  onChangeAns: (ans: Answer) => void;
  userAns: Answer;
};

const QuizApp = ({ idx, questions, onChangeAns, userAns }: QuizAppProps) => {
  return (
    <>
      <div className="text-neutral-50 py-2 max-w-md">
        <MarkdownWrapper content={formatToMarkdown(questions[idx]?.title)} />
      </div>
      <div className="flex flex-col gap-2">
        {questions[idx].answers.map((ans, i) => (
          <label
            key={i}
            className={`flex gap-2 items-center  ${
              questions[idx].userAns === undefined &&
              "hover:cursor-pointer hover:text-slate-50"
            }
                  ${
                    questions[idx].userAns !== undefined
                      ? ans.isCorrect
                        ? "text-green-400"
                        : "text-red-400"
                      : " "
                  }
                  `}
          >
            <input
              type="checkbox"
              value={ans.answer}
              onChange={() => onChangeAns(ans)}
              checked={
                //either current user ans
                ans.answer === userAns.answer ||
                // or if we move with next/prev
                questions[idx]?.userAns?.answer === ans.answer
              }
              className="checkbox checkbox-warning checkbox-sm"
              disabled={questions[idx].userAns !== undefined}
            />
            <MarkdownWrapper content={ans.answer} />
          </label>
        ))}
      </div>
    </>
  );
};

export default QuizApp;
