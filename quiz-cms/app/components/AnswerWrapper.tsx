import MarkdownWrapper from "../utils/MarkdownWrapper";
import {
  formatToMarkdown,
  formatToTemplateLiteral,
} from "../utils/stringFormatters";
import { Answer } from "../utils/types";
import ToggleButton from "./ToggleButton";
import { SetStateAction, SyntheticEvent, useState } from "react";
import EditAnswerForm from "./EditAnswerForm";
import PopupWrapper from "../utils/PopupWrapper";
import editAnswer from "../api_functions/answers/edit_answer";

const AnswerWrapper = ({
  idx,
  answer,
  onSucces,
  setShowAnswers,
}: {
  idx: number;
  answer: Answer;
  onSucces: () => void;
  setShowAnswers: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [showEditAnswer, setShowEditAnswer] = useState(false);

  const [edittedAnswer, setEdittedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(answer.isCorrect);

  const onDeleteAnswer = () => {};
  const onEditAnswer = (e: SyntheticEvent) => {
    e.preventDefault();
    const newAnswer = formatToTemplateLiteral(edittedAnswer);

    editAnswer(answer._id, newAnswer, isCorrect, onSuccessAns);
  };
  const onSuccessAns = () => {
    onSucces();
    setShowEditAnswer(false);
    setShowAnswers(true);
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
            setAnswer={setEdittedAnswer}
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
