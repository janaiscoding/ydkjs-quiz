import { RefObject } from "react";

const animateExit = (ref: RefObject<HTMLDivElement>) => {
  ref.current!.classList.remove("animate__enter");
  ref.current!.classList.add("animate__exit");
  ref.current!.classList.remove("animate__come__from__left");
};

const animateEnter = (ref: RefObject<HTMLDivElement>) => {
  ref.current!.classList.remove("animate__exit");
  ref.current!.classList.remove("animate__come__from__left");
  ref.current!.classList.add("animate__enter");
};

export { animateEnter, animateExit };
