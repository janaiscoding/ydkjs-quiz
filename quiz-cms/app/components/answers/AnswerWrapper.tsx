import MarkdownWrapper from "../../utils/MarkdownWrapper";
import {
  formatToMarkdown,
  formatToTemplateLiteral,
} from "../../utils/stringFormatters";
import { Answer } from "../../utils/types";
import ToggleButton from "../ToggleButton";
import { SyntheticEvent, useState } from "react";
import EditAnswerForm from "./EditAnswerForm";
import PopupWrapper from "../../utils/PopupWrapper";
import editAnswer from "../../api_functions/answers/edit_answer";

const AnswerWrapper = ({
  idx,
  answer,
  onSucces,
}: {
  idx: number;
  answer: Answer;
  onSucces: () => void;
}) => {
  const [showDeleteAnswer, setShowDeleteAnswer] = useState(false);
  const [showEditAnswer, setShowEditAnswer] = useState(false);

  const [edittedAnswer, setEdittedAnswer] = useState(answer.answer);
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
  };

  return (
    <article
      className="flex flex-col items-start gap-4 border border-yellow-200/20 p-4 border-solid"
      key={answer._id}
    >
      <div className={`flex gap-1 ${answer.isCorrect && "text-green-400"}`}>
        <p>{idx}.</p>
        <div className="answer__code">
          <MarkdownWrapper content={formatToMarkdown(answer.answer)} />
        </div>
      </div>

      {/* BUTTON CONTROLLER */}
      <div className="flex justify-between gap-1 w-full">
        <ToggleButton
          target={showEditAnswer}
          toggler={setShowEditAnswer}
          buttonText="Edit answer"
        />

        <ToggleButton
          target={showDeleteAnswer}
          toggler={setShowDeleteAnswer}
          buttonText="Delete answer"
        />
      </div>

      {/* EDIT ANSWER FORM POPUP */}

      <PopupWrapper isShown={showEditAnswer}>
        <EditAnswerForm
          isCorrect={isCorrect}
          defaultAnswer={formatToMarkdown(edittedAnswer)}
          setAnswer={setEdittedAnswer}
          setIsCorrect={setIsCorrect}
          onSubmit={onEditAnswer}
          onCancel={() => setShowEditAnswer(false)}
        />
      </PopupWrapper>
    </article>
  );
};

export default AnswerWrapper;
