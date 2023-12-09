import MarkdownWrapper from "@/frontend/app/utils/MarkdownWrapper";
import { TQuestion, TQuiz } from "@/frontend/app/utils/types";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import QuizNavigation from "./quiz-navigation";
import { IoCheckmark } from "react-icons/io5";

const QuizGame = ({ quiz }: { quiz: TQuiz }) => {
  console.log(quiz)
  // const {
  //   questions,
  //   userScore,
  //   userCorrectQuestions,
  //   userWrongQuestions,
  //   isCompleted,
  // } = quiz;
  // Active question index, is used to keep track of array index position (not uniqid, array index)
  const [index, setIndex] = useState<number>(0);
  // Moves active question based on array index from above - by default starts at 0 - set in useEffect
  const [currentQ, setCurrentQ] = useState<TQuestion>();

  // Form validator
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  // After uses presses submit, they will see if answer is correct or not
  const [isCorrect, setCorrect] = useState<boolean | undefined>();

   const [score, setScore] = useState<number>(0);
  //
  const handleScore = () => {
    setScore((prevScore) => prevScore! + 1);
  };

  const handleNextQuestion = () => {
    const newIndex = index + 1;
    setIndex(newIndex);
    setCorrect(undefined);
  };
  const handleDisplayResults = () => {
    console.log("will send user to results page");
  };

  const handleQuestionSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedAnswer === currentQ.correctAnswer) {
      setCorrect(true);
      console.log(selectedAnswer);
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
    // ideally we want to fetch the index from which the user has left off
    //setCurrentQ(questions[index]);

    // But also everytime index changes - aka on next click
  }, [index]);

  return (
    <form
      className="flex flex-col items-start gap-4 gradient__bg text-neutral-50 p-4 z-50 md:p-10"
      onSubmit={(e) => handleQuestionSubmit(e)}
    >
      <legend className="text-lg">
        <MarkdownWrapper content={currentQ?.title} />
      </legend>

      <div className="flex flex-col gap-4">
        {currentQ?.answers.map((ans, i) => (
          <label
            key={i}
            className="flex gap-2 items-center hover:text-slate-50 hover:cursor-pointer opacity-80 hover:opacity-100"
          >
            <input
              type="checkbox"
              value={ans}
              id={ans}
              onChange={onValueChange}
              checked={ans === selectedAnswer}
              className="checkbox checkbox-warning checkbox-sm"
            />
            <MarkdownWrapper content={ans} />
          </label>
        ))}
      </div>

      {isCorrect !== undefined && (
        <div className="w-full rounded-b-2xl text-center">
          {isCorrect ? (
            <p className="text-codeGreen">Correct answer! Well done!</p>
          ) : (
            <p className="text-codeError">Wrong Answer! </p>
          )}
        </div>
      )}

      <div className="flex justify-between items-center w-full">
        <button
          className="px-4 p-2
            flex gap-1 items-center
            text-codeGreen bg-codeBlue
            hover:bg-neutral-950
            active:translate-y-1
            border border-codeGreen 
            transition"
          type="submit"
        >
          <IoCheckmark />
          <p>Submit</p>
        </button>
        {quiz.questions && (
          <QuizNavigation
            qLength={quiz.questions.length}
            index={index}
            isCorrect={isCorrect}
            handleNextQuestion={handleNextQuestion}
            handleDisplayResults={handleDisplayResults}
          />
        )}
      </div>

      <h1 className="self-end text-sm">
        question <span className="text-codeGreen">{index + 1}</span> /{" "}
        {quiz.questions?.length}
      </h1>
    </form>
  );
};

export default QuizGame;