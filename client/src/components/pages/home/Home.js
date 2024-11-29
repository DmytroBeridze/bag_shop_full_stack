import "./home.scss";

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

import pageUp from "../../../features/PageUp";
import CustomScrollToTop from "../../../features/CustomScrollToTop";

const Home = () => {
  const dispatch = useDispatch();

  // ---memoised goods
  const unsafeSelector = createSelector(
    (state) => state.galleryReducer.goods,
    (state) => state.mainFilterReducer.mainfilterType,
    (goods, filter) => {
      return goods && goods.filter((elem) => elem.mainType === filter);
    }
  );
  const filteredGoods = useSelector(unsafeSelector).slice(0, 7);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());

    pageUp();
  }, []);

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
      <CustomScrollToTop />
    </div>
  );
};

export default Home;
