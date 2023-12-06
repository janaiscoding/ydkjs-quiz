"use client";
import { fromTop } from "@/app/utils/animation_variants";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center">
      <motion.div
        variants={fromTop}
        initial="hidden"
        animate="visible"
        className="gradient__bg"
      >
        <div className="flex px-6 w-full text-center text-sm">
          <a className="hover:cursor-pointer hover:scale-105 transition">
            You Don&apos;t Know JavaScript Yet! Quiz
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
