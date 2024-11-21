import "./newGoods.scss";

import { useEffect } from "react";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { useDispatch, useSelector } from "react-redux";
import pageUp from "../../../features/PageUp";
import CatalogGalery from "../../catalogPage/CatalogGalery";

const NewGoods = () => {
  const dispatch = useDispatch();

  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );
  const saleItems = goods.filter((elem) => elem.new !== "false");

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);

  return (
    <div className="newGoods">
      <CatalogGalery
        goods={saleItems}
        isloading={isloading}
        status={status}
        title="New Arrivals"
      />
    </div>
  );
};

export default NewGoods;
