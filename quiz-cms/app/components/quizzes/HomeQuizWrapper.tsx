import { Quiz } from "@/app/utils/types";
import ToggleButton from "../ToggleButton";
import { useContext, useState } from "react";
import PopupWrapper from "@/app/utils/PopupWrapper";
import { QuizzesContext } from "@/app/context/quizzesContext";
import getQuizzes from "@/app/api_functions/quizzes/get_quizzes";
import DeletePopup from "../DeletePopup";
import deleteQuiz from "@/app/api_functions/quizzes/delete_quiz";

const HomeQuizWrapper = ({ quiz, idx }: { quiz: Quiz; idx: number }) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const quizzesContext = useContext(QuizzesContext);

  // Loading effect
  const [isLoading, setLoading] = useState(true);

  // Fetch and set context
  const fetchQuizzes = async () => {
    const myQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(myQuizzes);
  };

  const onDelete = () => {
    deleteQuiz(quiz._id);
    setShowDelete(false);
    fetchQuizzes();
  };

  return (
    <div key={quiz._id} className="bg-sky-950 p-4 flex flex-col gap-4">
      <a href={`/quizzes/${quiz._id}`} className="link">
        {idx + 1}. {quiz.title} ({quiz.questions.length} questions)
      </a>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <ToggleButton
          target={showEditTitle}
          toggler={setShowEditTitle}
          buttonText="Edit quiz"
        />

        <ToggleButton
          target={showDelete}
          toggler={setShowDelete}
          buttonText="Delete quiz"
        />
      </div>

      {/* DELETE QUIZ POPUP */}
      <PopupWrapper isShown={showDelete}>
        <DeletePopup
          onDelete={onDelete}
          onCancel={() => setShowDelete(false)}
        />
      </PopupWrapper>
    </div>
  );
};

export default HomeQuizWrapper;
