const scrollbarShow = () => {
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.overflowY = "scroll";
};
const scrollbarHide = () => {
  document.body.style.position = "static";
};

export { scrollbarShow, scrollbarHide };
