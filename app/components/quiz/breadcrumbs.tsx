const Breadcrumbs = ({ chapter }: { chapter: string | undefined }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a aria-label="link to home" href="/">
            Home
          </a>
        </li>
        <li>
          <a aria-label="link to quiz page" href="/quiz">
            Quiz
          </a>
        </li>
        {!chapter && <li>Loading quiz...</li>}
        {chapter && <li> {chapter}</li>}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
