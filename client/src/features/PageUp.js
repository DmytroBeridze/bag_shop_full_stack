const pageUp = (top = 0, left = 0) => {
  window.scrollTo({
    top: top,
    left: left,
    behavior: "smooth",
  });
};
export default pageUp;
