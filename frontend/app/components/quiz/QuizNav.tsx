const QuizNav = ({ title }: { title: string }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>{title}</li>
      </ul>
    </div>
  );
};

export default QuizNav;
