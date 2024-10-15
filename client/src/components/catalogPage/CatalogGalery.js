import "./catalogGalery.scss";
import sampleImg from "../../resources/img/blog/blog-img-placeholder.jpg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { fetchAllGoods } from "../gallery/gallerySlice";
import Gallery from "../gallery/Gallery";
import PromoProducts from "../promoProducts/PromoProducts";
import pageUp from "../../features/PageUp";
import { getAllPosts } from "../adminPanel/addPostsForm/postSlice";
import CatalogDropdown from "./CatalogDropdown";
import catalogGaleryDescription from "./catalogGaleryDescription";

const CatalogGalery = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [desription, setDescription] = useState();
  const { mainType } = useParams();
  const filter = location.state?.filter;

  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );

  const filteredProducts = () => {
    const filteredMainType = goods.filter((elem) => elem.mainType === mainType);

    return filter
      ? filteredMainType.filter((item) => item.type === filter)
      : filteredMainType;
  };

  useEffect(() => {
    setDescription(catalogGaleryDescription(mainType));
  }, [mainType]);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, [dispatch]);

  const products = filteredProducts();
  const title = `${mainType[0].toUpperCase()}${mainType.slice(1)} `;

  return (
    <div className="catalog-galery">
      <div className="main-container catalog-galery__container">
        <div className="catalog-galery__sidebar">
          <CatalogDropdown
            dataType="catalogGalery"
            productType={mainType}
            productFilter={filter}
          />
          <PromoProducts elemQuantity={3} />
        </div>
        <main className="catalog-galery__main">
          <header className="catalog-galery__header">
            <div
              className="catalog-galery__header-image"
              style={{
                backgroundImage: `url(${desription && desription.image})`,
              }}
            >
              <h2>{title}</h2>
            </div>
          </header>
          <p className="catalog-galery__description">
            {desription && desription.text}
          </p>

          <Gallery goodsArray={products} columns={3} />
        </main>
      </div>
    </div>
  );
};

export default CatalogGalery;
