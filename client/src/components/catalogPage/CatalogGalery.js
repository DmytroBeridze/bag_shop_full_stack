import "./catalogGalery.scss";

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
import Sort from "./Sort";
import Button from "../buttons/Buttons";
import GalleryNavigation from "../galleryNavigation/GalleryNavigation";
import CustomScrollToTop from "../../features/CustomScrollToTop";

const CatalogGalery = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );

  const [description, setDescription] = useState();
  const [collectionsName, setCollectionsName] = useState(false);
  const [products, setProducts] = useState(false);
  const [transition, setTransition] = useState(false);

  const { mainType } = useParams();
  const filter = location.state?.filter;

  const [quantity, setQuantity] = useState(6);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(quantity);
  const [sortedArray, setSortedArray] = useState([]);
  const [stringNbr, setStringNbr] = useState(1);

  const displayBtns = sortedArray.length < goods.length ? true : false;

  const filteredProducts = () => {
    const filteredMainType = goods.filter((elem) => elem.mainType === mainType);

    return filter
      ? filteredMainType.filter((item) => item.type === filter)
      : filteredMainType;
  };

  // --------quantity posts per page
  const onChangeQuantityGoodsToPage = (e) => {
    setQuantity(Number(e.target.value));
    setFirstIndex(0);
    setStringNbr(1);
  };

  // ---------next page
  const nextPage = () => {
    if (lastIndex < products.length) {
      setTransition(true);
      setStringNbr((stringNbr) => stringNbr + 1);

      setTimeout(() => {
        setFirstIndex(lastIndex);
        setLastIndex(Math.min(lastIndex + quantity, products.length));

        setTransition(false);
      }, 500);
    }
  };

  // ---------prev page
  const prevPage = () => {
    if (firstIndex > 0) {
      setTransition(true);
      setStringNbr((stringNbr) => stringNbr - 1);

      setTimeout(() => {
        setLastIndex(firstIndex);
        setFirstIndex(Math.max(firstIndex - quantity, 0));

        setTransition(false);
      }, 500);
    }
  };

  useEffect(() => {
    setLastIndex(quantity);
  }, [quantity, products]);

  useEffect(() => {
    setSortedArray(products && products.slice(firstIndex, lastIndex));
  }, [lastIndex, products]);

  useEffect(() => {
    pageUp(550);
  }, [firstIndex, lastIndex]);

  useEffect(() => {
    pageUp();
    dispatch(getAllPosts());
    dispatch(fetchAllGoods());
  }, [dispatch]);

  useEffect(() => {
    if (goods.length > 0) {
      setTransition(true);
      setTimeout(() => {
        setDescription(catalogGaleryDescription(mainType));
        setCollectionsName(`${mainType[0].toUpperCase()}${mainType.slice(1)} `);
        setProducts(filteredProducts());
        setTransition(false);
      }, 500);
    }
  }, [goods, mainType]);

  useEffect(() => {
    setProducts(filteredProducts());
  }, [filter]);

  useEffect(() => {
    setFirstIndex(0);
    setStringNbr(1);
  }, [mainType, filter]);

  return (
    <div className="catalog-galery">
      <div className="main-container catalog-galery__container">
        <div className="catalog-galery__sidebar">
          {/* ----------sidebar */}
          <CatalogDropdown
            dataType="catalogGalery"
            productType={mainType}
            productFilter={filter}
          />
          <PromoProducts elemQuantity={3} />
        </div>
        {/* ----------main */}
        <div>
          <main
            className={
              transition
                ? `catalog-galery__main loading`
                : `catalog-galery__main`
            }
          >
            <header className="catalog-galery__header">
              <div
                className="catalog-galery__header-image"
                style={{
                  backgroundImage: `url(${description && description.image})`,
                }}
              >
                <h2>{collectionsName}</h2>
              </div>
            </header>
            <p className="catalog-galery__description">
              {description && description.text}
            </p>
            {/* -----------sort */}
            <Sort
              onChangeQuantityGoodsToPage={onChangeQuantityGoodsToPage}
              quantity={quantity}
            />
            {/* -----------gallery */}
            <Gallery goodsArray={sortedArray} columns={3} />
          </main>
          {/*------------- navigation */}
          {displayBtns && (
            <GalleryNavigation
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              stringNbr={stringNbr}
              arr={products}
              quantity={quantity}
              prevPage={prevPage}
              nextPage={nextPage}
            />

            // <div className="blog__nav">
            //   <Button
            //     className="grey-stroke__black-hover"
            //     label="prev"
            //     disabled={firstIndex === 0}
            //     onclick={() => prevPage()}
            //   />

            //   <div style={{ color: "#9fa3a7" }}>{`${stringNbr}/${Math.ceil(
            //     products.length / quantity
            //   )}`}</div>

            //   <Button
            //     className="grey-stroke__black-hover"
            //     label="next"
            //     disabled={lastIndex >= products.length}
            //     onclick={() => nextPage()}
            //   />
            // </div>
          )}
        </div>
      </div>
      {/* ------scroll to top */}
      <CustomScrollToTop />
    </div>
  );
};

export default CatalogGalery;
