import MarkdownWrapper from "../ui/MarkdownWrapper";
import { formatToMarkdown } from "../../utils/stringFormatters";
import { Question } from "../../utils/types";
import ContentWrapper from "../ui/ContentWrapper";
import { FaRegEye } from "react-icons/fa";

const QuestionContainer = ({
  idx,
  question,
}: {
  idx: number;
  question: Question;
}) => {
  return (
    <ContentWrapper>
      <article
        className="flex flex-col items-start gap-4 border-solid md:min-w-[30rem]"
        key={question._id}
      >
        <div className={`flex gap-1 `}>
          <p>{idx + 1}.</p>
          <div className="answer__code">
            <MarkdownWrapper content={formatToMarkdown(question.title)} />
          </div>
        </div>

        {/* Q. LINK */}
        <a
          href={`/questions/${question._id}`}
          className=" self-center flex gap-1 items-center justify-center p-2 text-slate-950 bg-yellow-200"
        >
          <FaRegEye />
          Go to q.
        </a>
      </article>
    </ContentWrapper>
  );
};

export default QuestionContainer;
