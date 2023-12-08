import { TQuestion } from "@/app/utils/types";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

const QuizForm = ({ questions }: { questions: TQuestion[] | undefined }) => {
  // Active question index, is used to keep track of array index position (not uniqid, array index)
  const [index, setIndex] = useState<number>(0);
  // Moves active question based on array index from above - by default starts at 0 - set in useEffect
  const [activeQ, setActiveQ] = useState<TQuestion | undefined>();

  // Form validator
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  // After uses presses submit, they will see if answer is correct or not
  const [isCorrect, setCorrect] = useState<boolean | undefined>();

  const handleNextQuestion = () => {
    const newIndex = index + 1;
    setIndex(newIndex);
    // setActiveQ(questions[newIndex]);
  };

  const handleQuestionSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedAnswer === activeQ?.correctAnswer) {
      setCorrect(true);
      //update score
      //update userselectecorrect
    } else {
      setCorrect(false);
    }
    // display correct status
    // display button to move to next q
  };

  // https://www.educative.io/answers/how-to-use-radio-buttons-in-react-js
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("gotta select current, deselect others", e.target.value);
    console.log(e.target.value);
    setSelectedAnswer(e.target.value);
  };
  useEffect(() => {
    //Everytime we render initially it will be at 0
    if (questions) {
      setActiveQ(questions[index]);
    }
    // But also everytime index changes
  }, [index, questions]);
  return (
    <form
      className="flex flex-col items-center gap-1 rounded-2xl bg-slate-800 min-h-4/5 p-0.5 z-50"
      onSubmit={(e) => handleQuestionSubmit(e)}
    >
      <legend className="text-lg md:text-4xl bg-background rounded-t-2xl p-10 text-foreground">
        {activeQ?.title}
      </legend>
      <div className="flex flex-col gap-4 px-4 md:px-10 pt-4 md:pt-10 ">
        {activeQ?.answers.map((ans, i) => (
          <label
            key={i}
            className="flex gap-1 items-center p-2 text-slate-200 hover:text-slate-50 hover:cursor-pointer"
          >
            <input
              type="checkbox"
              value={ans}
              id={ans}
              onChange={onValueChange}
              checked={ans === selectedAnswer}
              className="checkbox checkbox-sm checkbox-primary"
            />
            {ans}
          </label>
        ))}
      </div>
      <button
        className="px-4 p-2 mb-10 md:px-6 border border-foreground bg-background hover:bg-foreground text-foreground hover:text-slate-950 transition;"
        type="submit"
      >
        Submit
      </button>
      {isCorrect !== undefined && (
        <div className="validation__message w-full bg-background rounded-b-2xl text-center p-2">
          {isCorrect ? (
            <p className="text-green-600">Correct answer! Well done!</p>
          ) : (
            <p className="text-red-600">Wrong Answer! </p>
          )}
        </div>
      )}

      <h1 className="self-end text-sm">
        question <span className="text-foreground">{index + 1}</span> /{" "}
        {questions?.length}
      </h1>
    </form>
  );
};

export default QuizForm;
