import "./catalogGalery.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { fetchAllGoods } from "../gallery/gallerySlice";
import Gallery from "../gallery/Gallery";
import PromoProducts from "../promoProducts/PromoProducts";
import pageUp from "../../features/PageUp";
import { getAllPosts } from "../adminPanel/addPostsForm/postSlice";
import SortComponent from "./SortComponent";
import CatalogDropdown from "./CatalogDropdown";
import catalogGaleryDescription from "./catalogGaleryDescription";
import GalleryNavigation from "../galleryNavigation/GalleryNavigation";
import CustomScrollToTop from "../../features/CustomScrollToTop";
import Preloader from "../preloader/Preloader";
import sort from "./Sort";

const CatalogGalery = ({ goods, isloading, status, title }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const galeryRef = useRef(null);
  // const sortRef = useRef(null);

  // console.log(sortRef.current);

  // const { goods, isloading, status } = useSelector(
  //   (state) => state.galleryReducer
  // );

  const [description, setDescription] = useState();
  const [collectionsName, setCollectionsName] = useState(false);
  const [products, setProducts] = useState(false);
  const [transition, setTransition] = useState(false);

  const { mainType } = useParams();
  const filter = location.state?.filter;

  const [quantity, setQuantity] = useState(6);
  const [sortProducts, setSortProducts] = useState("low");
  const [sortAttr, setSortAttr] = useState("price");

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(quantity);
  const [stringNbr, setStringNbr] = useState(1);
  // const [sortedArray, setSortedArray] = useState([]);
  // const [distanceFromTop, setDistanceFromTop] = useState(0);

  const sortedArray = useMemo(() => {
    return products && products.slice(firstIndex, lastIndex);
  }, [lastIndex, firstIndex, products]);

  const displayBtns = sortedArray.length < goods.length ? true : false;

  // --sort
  const sortedProductsArr = sort(goods, sortAttr, sortProducts);

  // const sortedByPriceArr = [...goods].sort((a, b) => {
  //   // price
  //   const price1 = JSON.parse(a.parameters).price;
  //   const price2 = JSON.parse(b.parameters).price;
  //   // name
  //   const name1 = a.name.toLowerCase();
  //   const name2 = b.name.toLowerCase();

  //   switch (sortAttr) {
  //     case "price":
  //       return sortProducts === "high" ? price2 - price1 : price1 - price2;
  //     case "name": {
  //       if (sortProducts === "a-z") {
  //         return name1.localeCompare(name2);
  //       } else if (sortProducts === "z-a") return name2.localeCompare(name1);
  //     }

  //     default:
  //       break;
  //   }
  // });

  const filteredProducts = () => {
    const filteredMainType = sortedProductsArr.filter(
      (elem) => elem.mainType === mainType
    );

    return filter
      ? filteredMainType.filter((item) => item.type === filter)
      : filteredMainType;
  };

  // --------quantity posts per page
  const onChangeQuantityGoodsToPage = (e) => {
    if (e.target.value === "all") {
      setQuantity(products.length);
    } else setQuantity(Number(e.target.value));

    // setQuantity(Number(e.target.value));
    setFirstIndex(0);
    setStringNbr(1);
  };

  const sortGoods = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataInfo = selectedOption.getAttribute("data-attr");
    setSortAttr(dataInfo);

    setSortProducts(e.target.value);
    setFirstIndex(0);
    setStringNbr(1);
  };

  const scrollGalleryIntoView = () => {
    const galleryElement = galeryRef.current;

    if (galleryElement) {
      const { top } = galleryElement.getBoundingClientRect();
      const offset = 200;
      console.log(window.scrollY + top);

      window.scrollTo({
        top: window.scrollY + top - offset,
        behavior: "smooth",
      });
    }
  };
  // ---------next page
  const nextPage = () => {
    if (lastIndex < products.length) {
      setTransition(true);
      setStringNbr((stringNbr) => stringNbr + 1);

      setTimeout(() => {
        setFirstIndex(+lastIndex);
        setLastIndex(Math.min(+lastIndex + quantity, products.length));
        scrollGalleryIntoView();

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
        scrollGalleryIntoView();

        setTransition(false);
      }, 500);
    }
  };

  useEffect(() => {
    setLastIndex(quantity);
  }, [quantity, products]);

  // useEffect(() => {
  //   setSortedArray(products && products.slice(firstIndex, lastIndex));
  // }, [lastIndex, firstIndex, products]);

  // const sortedArray = useMemo(() => {
  //   return products && products.slice(firstIndex, lastIndex);
  // }, [lastIndex, firstIndex, products]);

  useEffect(() => {
    // pageUp();
    dispatch(getAllPosts());
    dispatch(fetchAllGoods());
    // const { top } = galeryRef.current?.getBoundingClientRect();
    // const { top = 0 } = galeryRef.current?.getBoundingClientRect() || {};
    // setDistanceFromTop(top);
  }, [dispatch]);

  useEffect(() => {
    pageUp();
  }, [mainType, dispatch]);

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
  }, [goods, mainType, sortProducts]);

  useEffect(() => {
    setProducts(filteredProducts());
  }, [filter, sortProducts]);

  useEffect(() => {
    setFirstIndex(0);
    setStringNbr(1);
  }, [mainType, filter]);

  if (isloading) {
    return (
      <div style={{ paddingTop: "200px", height: "100vh" }}>
        <Preloader />
      </div>
    );
  }
  if (status) {
    return (
      <div style={{ paddingTop: "200px", height: "100vh" }}>
        <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
      </div>
    );
  }

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
        {description && (
          // {products.length > 0 && description && (
          <div>
            <main
              className={
                transition
                  ? `catalog-galery__main loading`
                  : `catalog-galery__main`
              }
            >
              <h2 className="catalog-galery__title">{title}</h2>
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
              <SortComponent
                onChangeQuantityGoodsToPage={onChangeQuantityGoodsToPage}
                sortGoods={sortGoods}
                quantity={quantity}
                sortProducts={sortProducts}
              />
              {/* -----------gallery */}
              <Gallery goodsArray={sortedArray} columns={3} ref={galeryRef} />
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
            )}
          </div>
        )}
      </div>

      {/* ------scroll to top */}
      <CustomScrollToTop />
    </div>
  );
};

export default CatalogGalery;
