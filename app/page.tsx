"use client";
import { motion } from "framer-motion";
import { fromBottom } from "./utils/animation_variants";

export default function App() {
  return (
    <div className="items-center justify-center flex flex-col">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fromBottom}
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
      </motion.h1>
    </div>
  );
}
