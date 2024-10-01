import "./home.scss";

import ScrollToTop from "react-scroll-to-top";
import ArrowTop from "../../../resources/icons/up-arrow.png";

import NewArrivals from "../../homePage/newArrivals/NewArrivals";
import FeaturedItems from "../../homePage/featuredItems/FeaturedItems";
import Gallery from "../../gallery/Gallery";

import { useEffect } from "react";
import MainFilters from "../../filters/MainFilters";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { createSelector } from "@reduxjs/toolkit";
import LatestFromBlog from "../../homePage/latestFromBlog/LatestFromBlog";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";

import { useLocation } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  // ----posts
  // const posts = useSelector((state) => state.postsReducer.posts);
  // const post = useSelector((state) => state.postsReducer.onePost);

  // ---memoised goods
  const unsafeSelector = createSelector(
    (state) => state.galleryReducer.goods,
    (state) => state.mainFilterReducer.mainfilterType,
    (goods, filter) => {
      return goods && goods.filter((elem) => elem.mainType === filter);
    }
  );
  const filteredGoods = useSelector(unsafeSelector).slice(0, 7);

  // const filteredGoodsToPage =
  //   location.pathname === "/" ? filteredGoods.slice(0, 7) : filteredGoods;
  // console.log(filteredGoodsToPage);

  // const latestPost = posts.reduce((acc, curr) => {
  //   return Date.parse(acc.createdAt) > Date.parse(curr.createdAt) ? acc : curr;
  // }, 0);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());

    pageUp();
  }, []);

  const pageUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      <NewArrivals />
      <FeaturedItems />

      <div className="home-gallery">
        <h2 className="home-gallery__title text-center">Best products</h2>
        <MainFilters />

        <Gallery goodsArray={filteredGoods} seeMore={true} />
      </div>
      <LatestFromBlog />

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
