"use client";
import { motion } from "framer-motion";
import { fromBottom, fromLeft } from "../utils/animation_variants";

const HeroText = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fromBottom}
      className="basis-full flex flex-col gap-6 items-center justify-center"
    >
      <h1 className="text-4xl max-w-3xl text-center">
        A fun, educative JavaScript quiz inspired by the{" "}
        <span className="text-foreground hover:cursor-pointer hover:text-blue transition">
          <a
            target="_blank"
            href="https://github.com/getify/You-Dont-Know-JS"
            aria-label="link for the book reference"
          >
            You Don&apos;t Know JS
          </a>
        </span>{" "}
        book
      </h1>
      <motion.button className="border border-foreground bg-background hover:bg-slate-700 text-foreground px-4 py-2 md:px-6 text-center hover:scale-105 transition">
        Let&apos;s start!
      </motion.button>
    </motion.div>
  );
};

export default HeroText;
