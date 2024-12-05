import "./quickWiev.scss";

// Import Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { useState } from "react";
import setToLocalStorage from "../../features/setToLocalStorage";
import Counter from "../counter/Counter";
import Preloader from "../preloader/Preloader";

const QuickView = ({ oneProduct, productCartOpen, handleClose }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;

  const [activeIndex, setActiveIndex] = useState(0);
  const [valueCounter, setValueCounter] = useState(1);

  // add to local storage
  const addToCart = () => {
    handleClose();
    productCartOpen(valueCounter);
    setToLocalStorage("goods", { ...oneProduct, counter: valueCounter });
  };

  if (!oneProduct) {
    return (
      <div style={{ paddingTop: "50px" }}>
        <Preloader />
      </div>
    );
  }

  if (oneProduct) {
    const { name, type, parameters, picture } = oneProduct;
    const { color, price } = JSON.parse(parameters);

    return (
      oneProduct && (
        <div className="quickPreview d-flex m-3 gap-5 ">
          <div className="quickPreview__slider">
            <div className="quickPreview__preview p-3 mb-1">
              <img
                className="w-100 "
                src={`${requestUrl}/${picture[activeIndex]}`}
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
                    src={`${requestUrl}/${elem}`}
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

                <button
                  className="custom-button main-yellow quickPreview__button"
                  onClick={() => addToCart(valueCounter)}
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
