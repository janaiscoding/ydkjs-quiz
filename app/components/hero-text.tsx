"use client";
import { motion } from "framer-motion";
import { fromLeft } from "../utils/animation_variants";

const HeroText = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fromLeft}
      className="text-4xl max-w-sm sm:max-w-xl xl:max-w-2xl 2xl:max-w-4xl text-center leading font-bold"
    >
      A fun, educative quiz game inspired by the{" "}
      <span className="text-foreground hover:cursor-pointer hover:text-blue transition">
        <a
          target="_blank"
          href="https://github.com/getify/You-Dont-Know-JS"
          aria-label="link for the book reference"
        >
          You Don&apos;t Know JS
        </a>
      </span>{" "}
      book, by Kyle Simpson
    </motion.div>
  );
};

export default HeroText;