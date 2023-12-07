"use client";
import Breadcrumbs from "@/app/components/quiz/breadcrumbs";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { data } from "./questions";
import { useURLToString } from "@/app/hooks/useURLToString";

const ChapterPage = ({ params }: { params: { chapter: string } }) => {
  const title = useURLToString(params.chapter);

  const [index, setIndex] = useState<number>(0);
  const [questions, setQuestions] = useState(data.questions);
  const [activeQ, setActiveQ] = useState(questions[index]);

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [isCorrect, setCorrect] = useState<boolean | undefined>();

  const handleNextQuestion = () => {
    const newIndex = index + 1;
    setIndex(newIndex);
    setActiveQ(questions[newIndex]);
  };

  const handleQuestionSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedAnswer === activeQ.correctAnswer) {
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
    setSelectedAnswer(e.target.value);
  };

  useEffect(() => {
    // will fetch questions
    // fetchData()
    // will find our current index from where the user left off
    // setIndex(0);
    // will set the active question
    // setActive(question[index])
  }, []);
  // console.log(questions[index], questions);
  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20">
      <Breadcrumbs chapter={title} />

      <form
        className="flex flex-col items-center gap-1 rounded-2xl bg-slate-800 min-h-4/5 p-0.5 z-50"
        onSubmit={(e) => handleQuestionSubmit(e)}
      >
        <legend className="text-lg md:text-4xl bg-background rounded-t-2xl p-10 text-foreground">
          {activeQ.title}
        </legend>
        <div className="flex flex-col gap-4 px-4 md:px-10 pt-4 md:pt-10 ">
          {activeQ.answers.map((answer, index) => (
            <label
              key={index}
              className="flex gap-1 items-center p-2 text-slate-200 hover:text-slate-50 hover:cursor-pointer"
            >
              <input
                type="checkbox"
                value={answer}
                id={answer}
                onChange={onValueChange}
                checked={answer === selectedAnswer}
                className="checkbox checkbox-sm checkbox-primary"
              />
              {answer}
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
      </form>
      <h1 className="self-end text-sm">
        question <span className="text-foreground">{index + 1}</span> /{" "}
        {questions.length}
      </h1>
    </div>
  );
};

export default ChapterPage;
