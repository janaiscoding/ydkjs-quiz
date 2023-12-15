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
  
  const fromLeft = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: {
      x: -100,
      opacity: 0,
      transition: { duration: 1 },
    },
  };
  
  const fromRight = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: {
      x: 100,
      opacity: 0,
      transition: { duration: 1 },
    },
  };
  export { fromTop, fromBottom, fromLeft, fromRight };