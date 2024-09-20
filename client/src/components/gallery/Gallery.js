import { useEffect } from "react";
import "./Gallery.scss";

import GalleryCard from "./GalleryCard";
import { fetchAllGoods } from "./gallerySlice";

import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const Gallery = ({ goodsArray }) => {
  // const { goods } = useSelector((state) => state.galleryReducer);
  // const { mainfilterType } = useSelector((state) => state.mainFilterReducer);

  // ?---перенесено в Home-------------
  // const dispatch = useDispatch();
  // const location = useLocation();

  // useEffect(() => {
  //   dispatch(fetchAllGoods());
  // }, []);

  // // ---memoised
  // const unsafeSelector = createSelector(
  //   (state) => state.galleryReducer.goods,
  //   (state) => state.mainFilterReducer.mainfilterType,
  //   (goods, filter) => {
  //     return goods.filter((elem) => elem.mainType === filter);
  //   }
  // );
  // const filteredGoods = useSelector(unsafeSelector);
  // ?-------------
  // const filteredGoods = goods.filter(
  //   (elem) => elem.mainType === mainfilterType
  // );

  // console.log(location.pathname);

  // ?---перенесено в Home-------------
  // const filteredGoodsToPage =
  //   location.pathname === "/" ? filteredGoods.slice(0, 7) : filteredGoods;
  // console.log(filteredGoodsToPage);
  // ?-------------
  return (
    <section className="gallery">
      <div className="main-container">
        <div className="gallery__gallery">
          {goodsArray.map(({ _id, ...params }) => (
            <GalleryCard key={_id} id={_id} {...params} />
          ))}
          <div className="more">See More -</div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
