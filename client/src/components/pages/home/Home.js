import "./home.scss";
import NewArrivals from "../../homePage/newArrivals/NewArrivals";
import { useEffect } from "react";
import FeaturedItems from "../../homePage/featuredItems/FeaturedItems";

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
    </div>
  );
};

export default Home;
