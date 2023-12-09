import { motion } from "framer-motion";
import { fromBottom } from "@/frontend/app/utils/animation_variants";
import { useState } from "react";
import TypewriterComponent from "typewriter-effect";

const HomeText = () => {
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
      <motion.a
        className="btn__quiz"
        href="/quiz"
        onMouseEnter={() => setButtonText("Let's play")}
        onMouseLeave={() => setButtonText("I'm ready!")}
      >
        {buttonText}
      </motion.a>
    </motion.div>
  );
};

export default HomeText;
