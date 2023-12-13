"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { fromBottom } from "@/app/utils/animation_variants";


export default function Footer() {
  return (
    <footer className="flex items-center justify-center mt-auto">
      <motion.div
        animate="visible"
        initial="hidden"
        variants={fromBottom}
        className="text-md text-neutral-200 flex gap-2 items-center"
      >
        Made by
        <a
          aria-label="github link for website maker"
          className="gradient__text flex items-center justify-center gap-1 hover:scale-105 transition"
          target="_blank"
          href="https://github.com/janaiscoding"
        >
          <FaGithub /> <span> @janaiscoding</span>
        </a>
      </motion.div>
    </footer>
  );
}
