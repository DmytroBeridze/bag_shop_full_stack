import "./sale.scss";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import pageUp from "../../../features/PageUp";
import CatalogGalery from "../../catalogPage/CatalogGalery";

const Sale = () => {
  const dispatch = useDispatch();

  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );
  const saleItems = goods.filter((elem) => elem.sale !== "false");

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);

  return (
    <div className="sale">
      <CatalogGalery
        goods={saleItems}
        isloading={isloading}
        status={status}
        title="Sale"
      />
    </div>
  );
};

export default Sale;
