import "./sale.scss";

import { useEffect } from "react";
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
