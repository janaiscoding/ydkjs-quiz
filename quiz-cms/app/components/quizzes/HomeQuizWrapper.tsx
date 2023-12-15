import { Quiz } from "@/app/utils/types";
import ToggleButton from "../ToggleButton";
import { SyntheticEvent, useContext, useState } from "react";
import PopupWrapper from "@/app/utils/PopupWrapper";
import { QuizzesContext } from "@/app/context/quizzesContext";
import getQuizzes from "@/app/api_functions/quizzes/get_quizzes";
import DeletePopup from "../DeletePopup";
import deleteQuiz from "@/app/api_functions/quizzes/delete_quiz";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import EditTitleForm from "../EditTitleForm";
import editQuizTitle from "@/app/api_functions/quizzes/edit_quiz_title";
import { FaRegEye } from "react-icons/fa";

const HomeQuizWrapper = ({ quiz, idx }: { quiz: Quiz; idx: number }) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // state for editting quiz title
  const [quizTitle, setQuizTitle] = useState("");

  const onSuccess = () => {
    // Perform this everytime an action happens
    fetchQuizzes();
    setShowEditTitle(false);
    setQuizTitle("");
  };

  const router = useRouter();
  const quizzesContext = useContext(QuizzesContext);

  // Fetch and set context after deleting a quiz on the homepage
  const fetchQuizzes = async () => {
    const myQuizzes = await getQuizzes();
    quizzesContext.setQuizzes(myQuizzes);
  };
  const onEditQuizTitle = (e: SyntheticEvent) => {
    e.preventDefault();
    editQuizTitle(quiz._id, quizTitle, onSuccess);
  };

  const onDelete = () => {
    deleteQuiz(quiz._id);
    setShowDelete(false);
    fetchQuizzes();
  };

  const handleRedirect = () => {
    router.push(`/quizzes/${quiz._id}`);
  };

  return (
    <div className="bg-sky-950 p-4 flex flex-col gap-4">
      <h1 className="text-2xl">
        {idx + 1}. {quiz.title} ({quiz.questions.length} questions)
      </h1>

      {/* CONTROLLER BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={handleRedirect}
          className="flex gap-1 items-center justify-center p-2 text-slate-950 bg-yellow-200"
        >
          <FaRegEye />
          Go to quiz
        </button>

        <ToggleButton
          target={showEditTitle}
          toggler={setShowEditTitle}
          buttonText="Edit title"
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

      {/* EDIT QUIZ TITLE FORM POPUP  */}
      <PopupWrapper isShown={showEditTitle}>
        <EditTitleForm
          defaultTitle={quiz.title}
          legend={"quiz"}
          setTitle={setQuizTitle}
          onSubmit={onEditQuizTitle}
          onCancel={() => setShowEditTitle(false)}
        />
      </PopupWrapper>
    </div>
  );
};

export default HomeQuizWrapper;
