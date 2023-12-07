"use client";
import { motion } from "framer-motion";
import { fromBottom, fromLeft, fromRight, fromTop } from "./utils/animation_variants";
import HeroText from "./components/hero-text";
import Image from "next/image";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-10 my-6 md:my-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fromTop}
        className="basis-full"
      >
        <Image
          src={"/illustration.png"}
          alt="illustration"
          width={600}
          height={600}
          className="object-fit w-60 md:w-96 float__image"
          priority={true}
        />
      </motion.div>
      <HeroText />
    </div>
  );
}
