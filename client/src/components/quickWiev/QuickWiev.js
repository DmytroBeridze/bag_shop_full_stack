import "./quickWiev.scss";

import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

// Import Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { useState } from "react";
import useCounter from "../../hooks/counter.hook";
import getToLocalStorage from "../../features/getToLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { productCartOpen } from "../gallery/gallerySlice";
import Counter from "../counter/Counter";

// const QuickView = ({ oneProduct, handleClose }) => {
const QuickView = ({ oneProduct, productCartOpen, handleClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [valueCounter, setValueCounter] = useState(1);
  // const { decrement, increment, counter } = useCounter();
  const dispatch = useDispatch();

  // const { oneProduct } = useSelector((state) => state.galleryReducer);

  // add to local storage
  const addToCart = () => {
    handleClose();
    // dispatch(productCartOpen(counter));
    productCartOpen(valueCounter);
    getToLocalStorage("goods", oneProduct._id, valueCounter);
  };

  if (oneProduct) {
    const { name, description, type, parameters, picture } = oneProduct;
    const { color, height, width, length, weight, price } =
      JSON.parse(parameters);

    return (
      oneProduct && (
        <div className="quickPreview d-flex m-3 gap-5 ">
          <div className="quickPreview__slider">
            <div className="quickPreview__preview p-3 mb-1">
              <img
                className="w-100 "
                src={`http://localhost:3002/${picture[activeIndex]}`}
                alt="quickPreview"
              />
            </div>
            <Swiper
              spaceBetween={5}
              slidesPerView={2}
              navigation={true}
              modules={[Navigation]}
              className="quickPreview__swiper"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {picture.map((elem, i) => (
                <SwiperSlide key={elem} onClick={() => setActiveIndex(i)}>
                  <img
                    style={{ opacity: i === activeIndex ? "1" : "0.5" }}
                    className="w-100 p-1"
                    src={`http://localhost:3002/${elem}`}
                    alt="quickPreview"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="quickPreview__info">
            <h3 className="quickPreview__title">{name}</h3>
            <p className="quickPreview__productType">
              Product type: {type[0].toUpperCase() + type.slice(1)}
            </p>
            <p className="quickPreview__color">Color: {color}</p>
            <p className="quickPreview__price">${price * valueCounter}</p>

            <div className="quickPreview__quantity">
              <p className="mb-3">Choose quantity:</p>
              <div className="d-flex align-items-center gap-3">
                <Counter
                  setValueCounter={setValueCounter}
                  valueCounter={valueCounter}
                />
                {/* <div className="quickPreview__couner">
                  <input type="text" value={counter} readOnly />
                  <span className="quickPreview__decrement" onClick={decrement}>
                    <FiMinus />
                  </span>
                  <span className="quickPreview__increment" onClick={increment}>
                    <FaPlus />
                  </span>
                </div> */}
                <button
                  className="custom-button main-yellow quickPreview__button"
                  onClick={addToCart}
                  disabled={valueCounter < 1}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
};
export default QuickView;
