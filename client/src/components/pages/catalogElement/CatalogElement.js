import "./catalogElement.scss";

import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import useCounter from "../../../hooks/counter.hook";
import ModalPopup from "../../modal/Modal";
import AddedToCart from "../../addedToCart/AddedToCart";
import getToLocalStorage from "../../../features/getToLocalStorage";
import Preloader from "../../preloader/Preloader";
import Counter from "../../counter/Counter";

import {
  clearOneProductState,
  fetchGoodsById,
  productCartOpen,
  productCartOpenFromGalleryCard,
} from "../../gallery/gallerySlice";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CatalogElement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { oneProduct, oneProductisloading, oneProductStatus, quantity } =
    useSelector((state) => state.galleryReducer);

  const [valueCounter, setValueCounter] = useState(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // add to local storage
  const addToCart = () => {
    dispatch(productCartOpen(valueCounter));

    getToLocalStorage("goods", oneProduct._id, valueCounter);
  };

  const productCartClose = () => {
    dispatch(productCartOpen(null));
    // dispatch(productCartOpenFromGalleryCard(null));
  };

  useEffect(() => {
    dispatch(fetchGoodsById(id));
  }, []);

  // обнулення clearOneProductState в gallerySlice, щоб на секунду
  //  не показувалася минула карточка при відкритті CatalogElement
  useEffect(() => {
    window.addEventListener("beforeunload", dispatch(clearOneProductState()));
    return () => {
      window.removeEventListener(
        "beforeunload",
        dispatch(clearOneProductState())
      );
    };
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (oneProduct) {
    const {
      picture,
      name,
      description,
      type,
      new: newest,
      parameters,
      sale,
      _id,
    } = oneProduct;

    const { color, height, width, length, weight, price } =
      JSON.parse(parameters);

    if (oneProductisloading) {
      return (
        <div style={{ paddingTop: "150px" }}>
          <Preloader />
        </div>
      );
    } else if (oneProductStatus) {
      return (
        <div style={{ paddingTop: "150px" }}>
          <h5 className="text-center mt-5 mb-5 text-danger">
            Loading error...
          </h5>
        </div>
      );
    }

    return (
      <section className="catalogElement">
        <div className="main-container">
          <div className="catalogElement__wrapper">
            {/*  order block */}
            <div className="catalogElement__order">
              {/* slider */}
              <div className="catalogElement__slider">
                {/* {thumbsSwiper && ( */}

                <Swiper
                  navigation
                  modules={[Navigation, Thumbs]}
                  style={{ maxHeight: "570px", marginBottom: "15px" }}
                  onSlideChange={handleSlideChange}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  // thumbs={{ swiper: thumbsSwiper }}
                >
                  {picture.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={`http://localhost:3002/${image}`}
                          alt={name.slice(0, 10)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {/* )} */}

                <Swiper
                  className="thumbs"
                  style={{ maxHeight: "100px" }}
                  slidesPerView={5}
                  spaceBetween={10}
                  modules={[Navigation, Thumbs]}
                  onSwiper={setThumbsSwiper}
                >
                  {picture.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`http://localhost:3002/${image}`}
                        alt={name.slice(0, 10)}
                        style={{
                          width: "100%",
                          height: "100%",
                          // objectFit: "contain",
                          objectFit: "cover",
                          opacity: index === activeIndex ? 1 : 0.6,
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/*  order form */}
              <div className="catalogElement__order-form ">
                <h3 className="catalogElement__title">{name}</h3>

                <div className="catalogElement__order-container">
                  <div className="catalogElement__order-description">
                    <table>
                      <tbody>
                        <tr className="catalogElement__color">
                          <td data-label="type">Type:</td>
                          <td style={{ lineHeight: "16px" }}>
                            {type ? type : "-"}
                          </td>
                        </tr>
                        <tr className="catalogElement__color">
                          <td>Color:</td>
                          <td>{color ? color : "-"}</td>
                        </tr>
                        <tr className="catalogElement__weight">
                          <td>Weight:</td>
                          <td>{weight ? weight : "-"}</td>
                        </tr>
                        <tr className="catalogElement__height">
                          <td>Height:</td>
                          <td>{height ? height : "-"}</td>
                        </tr>
                        <tr className="catalogElement__width">
                          <td>Width:</td>
                          <td>{width ? width : "-"}</td>
                        </tr>
                        <tr className="catalogElement__length">
                          <td>Length:</td>
                          <td>{length ? length : "-"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="catalogElement__order-block">
                    <p className="catalogElement__price">
                      ${price * valueCounter}
                    </p>
                    <p className="mb-3 mt-3">Choose quantity:</p>
                    <div className="d-flex align-items-center gap-3">
                      {/* Counter */}
                      <Counter
                        setValueCounter={setValueCounter}
                        valueCounter={valueCounter}
                      />

                      <button
                        className="custom-button main-yellow catalogElement__button"
                        onClick={addToCart}
                        disabled={valueCounter < 1}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  description block */}
            <div className="catalogElement__description">
              <h4>Welcome to the world of fashion.</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>

        {/* popup */}
        <ModalPopup
          show={quantity ? true : false}
          onHide={productCartClose}
          btnstyle="btn-secondary"
        >
          <AddedToCart oneProduct={oneProduct} quantity={quantity} />
          {/* <AddedToCart oneProduct={oneProduct} id={_id} quantity={quantity} /> */}
        </ModalPopup>
      </section>
    );
  }
};

export default CatalogElement;