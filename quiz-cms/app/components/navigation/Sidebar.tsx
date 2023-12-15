import { ViewContext } from "@/app/context/viewContext";
import { useContext } from "react";

const Sidebar = () => {
  const viewContext = useContext(ViewContext);

  const handleQuizView = () => viewContext.setView("quizzes");
  const handleAddQuizView = () => viewContext.setView("add-quiz");
  const handleAddQuestionView = () => viewContext.setView("add-question");

  return (
    <nav className="max-w-sm min-h-fit bg-sky-950 p-4 text-neutral-400 border-r border-sky-900 hidden md:block z-50">
      <ul>
        <li
          onClick={handleQuizView}
          className="p-4 hover:cursor-pointer hover:bg-indigo-800 rounded-md hover:text-yellow-100"
        >
          Quizzes List
        </li>
        <li
          onClick={handleAddQuizView}
          className="p-4 hover:cursor-pointer hover:bg-indigo-800 rounded-md hover:text-yellow-100"
        >
          Add a new quiz
        </li>
        <li
          onClick={handleAddQuestionView}
          className="p-4 hover:cursor-pointer hover:bg-indigo-800 rounded-md hover:text-yellow-100"
        >
          Add a new question
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
