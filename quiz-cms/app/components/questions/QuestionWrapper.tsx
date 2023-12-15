import MarkdownWrapper from "../../utils/MarkdownWrapper";
import { formatToMarkdown } from "../../utils/stringFormatters";
import { Question } from "../../utils/types";

const QuestionWrapper = ({
  idx,
  question,
}: {
  idx: number;
  question: Question;
}) => {
  return (
    <article
      className="flex flex-col items-start gap-4 border border-yellow-200/20 p-4 border-solid"
      key={question._id}
    >
      <div className={`flex gap-1 `}>
        <p>{idx + 1}.</p>
        <div className="answer__code">
          <MarkdownWrapper content={formatToMarkdown(question.title)} />
        </div>
      </div>
      <a href={`/questions/${question._id}`} className="link">
        Go to edit
      </a>
    </article>
  );
};

export default QuestionWrapper;
