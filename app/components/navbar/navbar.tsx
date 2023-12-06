"use client";
import { motion } from "framer-motion";
import styles from "./navbar.module.css";

const Navbar = () => {
  const fromTop = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hidden: {
      y: -10,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <nav>
      <motion.div
        variants={fromTop}
        initial="hidden"
        animate="visible"
        className={`${styles.navbar__bg} rounded-full p-3`}
      >
        <div className="flex text-neutral-950 px-6 w-full text-center text-sm">
          <a className="hover:cursor-pointer hover:scale-105 transition">
            You Don&apos;t Know JavaScript Yet! Quiz
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
