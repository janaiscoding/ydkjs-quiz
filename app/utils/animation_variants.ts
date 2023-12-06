const fromTop = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hidden: {
    y: -10,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const fromBottom = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hidden: {
    y: 10,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export { fromTop, fromBottom };
