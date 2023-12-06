"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect } from "react";

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
        className="navbar navbar-bg rounded-full p-3"
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
