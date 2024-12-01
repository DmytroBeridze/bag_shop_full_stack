import "./catalogSlider.scss";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

import SaleLabel from "../../saleLabel/SaleLabel";

const CatalogSlider = ({ name, picture, sale }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;

  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="catalogElement__slider">
      <Swiper
        navigation
        modules={[Navigation, Thumbs]}
        style={{ maxHeight: "570px" }}
        onSlideChange={handleSlideChange}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {picture.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                loading="lazy"
                src={`${requestUrl}/${image}`}
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

      <Swiper
        className="thumbs mt-3"
        slidesPerView={5}
        spaceBetween={10}
        modules={[Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
      >
        {picture.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${requestUrl}/${image}`}
              alt={name.slice(0, 10)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: index === activeIndex ? 1 : 0.6,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {JSON.parse(sale) && <SaleLabel />}
    </div>
  );
};

export default CatalogSlider;
