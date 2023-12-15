const Sidebar = () => {
  return (
    <nav className="max-w-sm min-h-fit bg-sky-950 p-4 text-neutral-400 border-r border-sky-900 hidden md:block">
      <ul>
        <li className="p-4 hover:cursor-pointer hover:bg-indigo-800 rounded-md hover:text-yellow-100">
          Add a new quiz
        </li>
        <li className="p-4 hover:cursor-pointer hover:bg-indigo-800 rounded-md hover:text-yellow-100">
          Add a new question
        </li>
        <li className="p-4 hover:cursor-pointer hover:bg-indigo-800 rounded-md hover:text-yellow-100">
          See your quizzes
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
