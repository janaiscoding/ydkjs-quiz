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

  const handleNextQuestion = () => {
    const newIndex = index + 1;
    setIndex(newIndex);
    setActiveQ(questions[newIndex]);
  };

  const handleQuestionSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedAnswer === activeQ.correctAnswer) {
      console.log("selected correct!");
      //update score
      //update userselectecorrect
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

      <h1 className="self-end">
        question <span className="text-foreground">{index + 1}</span> /{" "}
        {questions.length}
      </h1>

      <form
        className="flex flex-col items-center gap-4 rounded-2xl gradient__bg text-slate-50 min-h-4/5 p-0.5 z-50"
        onSubmit={(e) => handleQuestionSubmit(e)}
      >
        <legend className="text-2xl md:text-4xl p-6 md:p-10 bg-background rounded-t-2xl">
          {" "}
          {activeQ.title}
        </legend>
        <div className="flex flex-col gap-4">
          {activeQ.answers.map((answer, index) => (
            <label
              key={index}
              className="flex gap-1 p-2 text-slate-950 hover:text-foreground hover:cursor-pointer"
            >
              <input
                type="radio"
                value={answer}
                id={answer}
                onChange={onValueChange}
                checked={answer === selectedAnswer}
              />
              {answer}
            </label>
          ))}
        </div>
        <button className="btn__quiz" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChapterPage;
