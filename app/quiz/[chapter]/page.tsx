"use client";
import Breadcrumbs from "@/app/components/quiz/breadcrumbs";
import { SyntheticEvent, useEffect, useState } from "react";
import { data } from "./questions";

const ChapterPage = ({ params }: { params: { chapter: string } }) => {
  const myChapter = params.chapter
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  const [index, setIndex] = useState<number>(0);
  const [questions, setQuestions] = useState(data.questions);
  const [activeQ, setActiveQ] = useState(questions[index]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();

  const handleChange = (newIndex: number) => {
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
  console.log(activeQ);
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
      <Breadcrumbs chapter={myChapter} />
      <h1>
        Question {activeQ.id + 1} out of {questions.length}
      </h1>
      <form onSubmit={(e) => handleQuestionSubmit(e)}>
        <legend className="text-2xl"> {activeQ.title}</legend>
        <div className="flex flex-col gap-1">
          {activeQ.answers.map((answer, index) => (
            <label htmlFor={answer} key={index} className="flex gap-1 p-2 border">
              <input type="radio" name={answer} />
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
