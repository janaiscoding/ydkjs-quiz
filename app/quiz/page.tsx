import Breadcrumbs from "../components/quiz/breadcrumbs";

const Quiz = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 md:gap-10 my-6 md:my-20">
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
      <div className="text-4xl text-foreground">Select your chapter</div>
      <div>
        <a
          href="/quiz/getting-started"
          className="text-2xl hover:text-foreground"
        >
          Getting Started
        </a>
      </div>
    </div>
  );
};

export default Quiz;
