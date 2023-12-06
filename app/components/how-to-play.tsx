"use client";
import { motion } from "framer-motion";
import { fromRight } from "../utils/animation_variants";
import Image from "next/image";

const HowToPlay = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fromRight}
      className=" group flex items-start overflow-hidden rounded-xl border border-border bg-background/10 p-0.5 outline-none backdrop-blur-sm duration-100 focus:border-foreground border_animate after:bg-background hover:after:bg-box"
    >
      <div className="flex flex-col gap-2 p-6">
        <h2 className="text-foreground text-5xl">How to play</h2>
        <div className="flex flex-col gap-1">
          <p>Select your chapter</p>
          <p>Choose the correct answer</p>
          <p>Learn by playing!</p>
        </div>
      </div>
      <Image
        src={"/ydkjs.webp"}
        alt="cover book image"
        className="aspect-video rounded-r-xl object-cover"
        width={400}
        height={400}
      />
    </motion.div>
  );
};

export default HowToPlay;
