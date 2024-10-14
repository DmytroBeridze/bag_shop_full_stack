import "./catalog.scss";

import { useEffect } from "react";

import pageUp from "../../../features/PageUp";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Collections from "../../galeryPage/Collections";
import Gallery from "../../gallery/Gallery";

import { useDispatch } from "react-redux";

const Catalog = () => {
  // galleryReducer

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);

  return (
    <div className="catalog">
      <div className="main-container">
        <Collections />
        {/* <Gallery goodsArray={[]} /> */}
      </div>
    </div>
  );
};

export default Catalog;
