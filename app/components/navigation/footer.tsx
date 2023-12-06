import styles from "./navigation.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center m-auto">
      <div className="text-md text-neutral-200 flex gap-2 items-center">
        Made by
        <a
          aria-label="github link for website maker"
          className={`${styles.footer__text} flex items-center justify-center gap-1 hover:scale-105 transition`}
          target="_blank"
          href="https://github.com/janaiscoding"
        >
          <FaGithub /> <span> @janaiscoding</span>
        </a>
      </div>
    </footer>
  );
}
