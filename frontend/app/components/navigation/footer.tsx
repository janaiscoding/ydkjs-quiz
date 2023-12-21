"use client";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center mt-auto">
      <div className="text-md text-neutral-200 flex gap-2 items-center animate__from__bottom">
        Made by
        <a
          aria-label="github link for website maker"
          className="gradient__text flex items-center justify-center gap-1 hover:scale-105 transition"
          target="_blank"
          href="https://github.com/janaiscoding"
        >
          <FaGithub /> <span> @janaiscoding</span>
        </a>
      </div>
    </footer>
  );
}
