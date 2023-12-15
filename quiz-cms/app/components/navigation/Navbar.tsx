"use client";
import { ViewContext } from "@/app/context/viewContext";
import { usePathname, useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext, useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  //   const userContext = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const viewContext = useContext(ViewContext);

  const [showMobile, setShowMobile] = useState(false);

  const handleMobileNav = () => {
    setShowMobile(!showMobile);
  };

  const handleQuizView = () => {
    viewContext.setView("quizzes");
    if (pathname !== "/") {
      router.push("/");
    }
    window.scroll(0, 0);
    if (showMobile) {
      setShowMobile(false);
    }
  };

  const handleAddQuizView = () => {
    viewContext.setView("add-quiz");
    if (pathname !== "/") {
      router.push("/");
    }
    window.scroll(0, 0);
    if (showMobile) {
      setShowMobile(false);
    }
  };

  const handleAddQuestionView = () => {
    viewContext.setView("add-question");
    if (pathname !== "/") {
      router.push("/");
    }
    window.scroll(0, 0);
    if (showMobile) {
      setShowMobile(false);
    }
  };

  const handleLogo = () => {
    if (pathname !== "/") {
      router.push("/");
    }
    window.scroll(0, 0);
    if (showMobile) {
      setShowMobile(false);
    }
  };

  return (
    <div className="bg-sky-950 flex flex-col gap-4 md:justify-center justify-between items-center w-full p-4 shadow-md border-b border-sky-900 z-50">
      <div className="flex md:justify-center justify-between items-center w-full">
        <button onClick={handleLogo} className="px-4 text-yellow-400">
          CMS
        </button>
        <nav className="text-neutral-400">
          <ul className="hidden md:flex gap-6 items-center">
            <li
              onClick={handleQuizView}
              className={`${
                viewContext.view === "quizzes" && "text-indigo-200"
              } hover:cursor-pointer hover:text-slate-100`}
            >
              Quizzes List
            </li>
            <li
              onClick={handleAddQuizView}
              className={`${
                viewContext.view === "add-quiz" && "text-indigo-200"
              } hover:cursor-pointer hover:text-slate-100`}
            >
              Add a new quiz
            </li>
            <li
              onClick={handleAddQuestionView}
              className={`${
                viewContext.view === "add-question" && "text-indigo-200"
              } hover:cursor-pointer hover:text-slate-100`}
            >
              Add a new question
            </li>
          </ul>

          <div className="md:hidden">
            <button onClick={handleMobileNav}>
              <RxHamburgerMenu />
            </button>
            {/* ADD MOBILE NAVIGATION HERE */}
          </div>
        </nav>
      </div>

      {showMobile && (
        <ul className="self-end text-end flex gap-2 items-center justify-between w-full">
          <li onClick={handleQuizView} className="hover:cursor-pointer">
            Quizzes
          </li>
          <li onClick={handleAddQuizView} className="hover:cursor-pointer">
            Add quiz
          </li>
          <li onClick={handleAddQuestionView} className="hover:cursor-pointer">
            Add question
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
