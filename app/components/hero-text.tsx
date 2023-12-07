"use client";
import { motion } from "framer-motion";
import { fromBottom } from "../utils/animation_variants";
import { useState } from "react";
import TypewriterComponent from "typewriter-effect";

const HeroText = () => {
  const [buttonText, setButtonText] = useState("I'm ready!");

  const words: string[] = [
    "the passion for learning!",
    "the motivation to level up!",
    "You Don't Know JS Yet!",
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fromBottom}
      className="basis-full flex flex-col gap-6 items-center justify-center text-center"
    >
      <div className="text-4xl max-w-3xl">
        A fun, educative quiz inspired by
        <TypewriterComponent
          options={{
            strings: words,
            autoStart: true,
            loop: true,
            wrapperClassName: "",
            deleteSpeed: 100,
            delay: 100,
          }}
        />
      </div>
      <motion.button
        className="
      px-4 py-2 md:px-6 
      border border-foreground 
      bg-background hover:bg-foreground 
      text-foreground hover:text-slate-950 
      transition
      "
        onMouseEnter={() => setButtonText("Let's play")}
        onMouseLeave={() => setButtonText("I'm ready!")}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};

export default HeroText;
