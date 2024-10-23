import "./sale.scss";

import { useEffect } from "react";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { useDispatch, useSelector } from "react-redux";
import CatalogGalery from "../../catalogPage/CatalogGalery";
import pageUp from "../../../features/PageUp";

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
      {/* <div className="main-container"> */}

      <CatalogGalery
        goods={saleItems}
        isloading={isloading}
        status={status}
        title="Sale"
      />
      {/* </div> */}
    </div>
  );
};

export default Sale;
