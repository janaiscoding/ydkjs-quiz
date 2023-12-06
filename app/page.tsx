"use client";
import { motion } from "framer-motion";
import { fromBottom,  fromRight } from "./utils/animation_variants";
import Image from "next/image";
import HeroText from "./components/hero-text";
import HowToPlay from "./components/how-to-play";

export default function App() {
  return (
    <div className="items-center justify-center flex flex-col gap-10">
      <HeroText />
      <HowToPlay />
      <motion.button
        initial="hidden"
        animate="visible"
        variants={fromBottom}
        className="gradient__bg rounded-full p-3"
      >
        <span className="flex px-6 w-full text-center text-2xl font-bold hover:scale-105 transition">
          Let&apos;s start!
        </span>
      </motion.button>
    </div>
  );
}
