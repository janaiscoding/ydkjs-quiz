import quiz from "@/app/data/full-quiz-data"
const Quiz = () => {
  return (
    <div className="flex flex-col justify-center gap-4 md:gap-10 my-6 md:my-20">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a aria-label="link to home" href="/">
              Home
            </a>
          </li>
          <li>Quiz</li>
        </ul>
      </div>
      <div className="text-4xl gradient__text">select your chapter</div>

      <ul>
        {quiz.map((chap) => (
          <li key={chap.id} className="text-2xl hover:text-foreground transition p-1">
            <a
              href={`/quiz/${chap.url}`}
              aria-labelledby={`link for the ${chap.title} quiz chapter`}
            >
              {chap.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
