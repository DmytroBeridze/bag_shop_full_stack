import "./catalog.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import pageUp from "../../../features/PageUp";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Collections from "../../catalogPage/Collections";

const Catalog = () => {
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
      </div>
    </div>
  );
};

export default Catalog;
