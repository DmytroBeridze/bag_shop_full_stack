import "./home.scss";

import ScrollToTop from "react-scroll-to-top";
import ArrowTop from "../../../resources/icons/up-arrow.png";

import NewArrivals from "../../homePage/newArrivals/NewArrivals";
import FeaturedItems from "../../homePage/featuredItems/FeaturedItems";
import Gallery from "../../gallery/Gallery";

import { useEffect } from "react";
import MainFilters from "../../filters/MainFilters";

const Home = () => {
  const pageUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    pageUp();
  }, []);

  return (
    <div className="home">
      <NewArrivals />
      <FeaturedItems />

      <div className="home-gallery">
        <h2 className="home-gallery__title text-center">Best products</h2>
        <MainFilters />
        <Gallery />
      </div>

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
    </div>
  );
};

export default Home;
