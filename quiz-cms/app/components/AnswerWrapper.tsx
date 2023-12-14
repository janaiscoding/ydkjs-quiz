import MarkdownWrapper from "../utils/MarkdownWrapper";
import { formatToMarkdown } from "../utils/stringFormatters";
import { Answer } from "../utils/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import ToggleButton from "./ToggleButton";
import { SyntheticEvent, useState } from "react";
import DeleteButton from "./DeleteButton";
import EditTitleForm from "./EditTitleForm";
import EditAnswerForm from "./EditAnswerForm";
import PopupWrapper from "../utils/PopupWrapper";
const AnswerWrapper = ({ idx, answer }: { idx: number; answer: Answer }) => {
  const [showEditAnswer, setShowEditAnswer] = useState(false);

  const [editAnswer, setEditAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(answer.isCorrect);

  const onDeleteAnswer = () => {};
  const onEditAnswer = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <article
      className="flex flex-col items-start gap-4 border border-yellow-200/20 p-4 border-solid"
      key={answer._id}
    >
      <div className="flex gap-1">
        <p>{idx}.</p>
        <div className="answer__code">
          <MarkdownWrapper content={formatToMarkdown(answer.answer)} />
        </div>
      </div>

      {!showEditAnswer && (
        <ToggleButton
          target={showEditAnswer}
          toggler={setShowEditAnswer}
          buttonText="Edit answer"
        />
      )}

      {showEditAnswer && (
        <PopupWrapper>
          <EditAnswerForm
            defaultCorrect={answer.isCorrect}
            defaultAnswer={formatToMarkdown(answer.answer)}
            setAnswer={setEditAnswer}
            setIsCorrect={setIsCorrect}
            onSubmit={onEditAnswer}
            onCancel={() => setShowEditAnswer(false)}
            onDeleteAnswer={onDeleteAnswer}
          />
        </PopupWrapper>
      )}
    </article>
  );
};

export default AnswerWrapper;
