import ScrollToTop from "react-scroll-to-top";
import ArrowTop from "../resources/icons/up-arrow.png";

const CustomScrollToTop = () => {
  return (
    <ScrollToTop
      style={{
        width: "50px",
        height: "50px",
      }}
      smooth
      component={
        <img src={ArrowTop} alt="ArrowTop" style={{ width: "100%" }} />
      }
    />
  );
};

export default CustomScrollToTop;
