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
      className="flex flex-col gap-4 border border-yellow-400 p-4 border-solid"
      key={answer._id}
    >
      <div className="flex gap-1">
        <p>{idx}.</p>
        <div className="answer__code">
          <MarkdownWrapper content={formatToMarkdown(answer.answer)} />
        </div>
      </div>

      <div className="flex gap-4">
        <ToggleButton
          target={showEditAnswer}
          toggler={setShowEditAnswer}
          buttonText="Edit answer"
        />
        <DeleteButton onDelete={onDeleteAnswer} deleteText={"answer"} />
      </div>

      {showEditAnswer && (
        <EditAnswerForm
          defaultAnswer={formatToMarkdown(answer.answer)}
          setAnswer={setEditAnswer}
          setIsCorrect={setIsCorrect}
          onSubmit={onEditAnswer}
          onCancel={() => setShowEditAnswer(false)}
        />
      )}
    </article>
  );
};

export default AnswerWrapper;