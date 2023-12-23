import { RefObject } from "react";

const animateNextExit = (ref: RefObject<HTMLDivElement>) => {
  ref.current!.classList.remove("animate__enter");
  ref.current!.classList.add("animate__exit");
  ref.current!.classList.remove("animate__come__from__left");
};

const animateNextEnter = (ref: RefObject<HTMLDivElement>) => {
  ref.current!.classList.remove("animate__exit");
  ref.current!.classList.remove("animate__come__from__left");
  ref.current!.classList.add("animate__enter");
};

const animatePrevExit = (ref: RefObject<HTMLDivElement>) => {
  ref.current!.classList.remove("animate__come__from__left");
  ref.current!.classList.add("animate__go__to__right");
};

const animatePrevEnter = (ref: RefObject<HTMLDivElement>) => {
  ref.current!.classList.remove("animate__go__to__right");
  ref.current!.classList.add("animate__come__from__left");
};

export { animateNextEnter, animateNextExit, animatePrevExit, animatePrevEnter };
