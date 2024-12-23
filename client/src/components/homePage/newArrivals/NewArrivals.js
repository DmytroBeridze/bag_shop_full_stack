import "./newArrivals.scss";
import new_arrivals_slide_1 from "../../../resources/img/home/slide1_1170x662_crop_center.webp";
import new_arrivals_slide_2 from "../../../resources/img/home/slide2_1170x662_crop_center.webp";
import new_arrivals_slide_3 from "../../../resources/img/home/slide3_1170x662_crop_center.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";

import Button from "../../buttons/Buttons";

const NewArrivals = () => {
  const navigate = useNavigate();

  return (
    <section className="new-arrivals">
      <div className="main-container">
        <div className="d-flex justify-content-center align-items-center gap-3 h-100">
          <div className="new-arrivals__description w-50">
            <h4 className="new-arrivals__subtitle">EVERLANE MODERN BACKPACK</h4>
            <h1 className="new-arrivals__title">New Arrivals</h1>
            <p className="new-arrivals__text">
              Backpacks aren't just for the back to school crowd. The Everlane
              Modern Backpack lets you carry your laptop, notebooks, and any
              other gear you need on your back.
            </p>

            <Button
              label={"Shop now"}
              className={"main-white"}
              onclick={() => navigate("/newGoods/backpacks")}
            />
          </div>
          <div className="new-arrivals__slider-container">
            <Swiper
              className="new-arrivals__swiper"
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination, Autoplay]}
            >
              <SwiperSlide className="new-arrivals__slide">
                <img
                  src={new_arrivals_slide_1}
                  alt="slide1"
                  className="w-100 h-100"
                />
              </SwiperSlide>
              <SwiperSlide className="new-arrivals__slide">
                <img
                  src={new_arrivals_slide_2}
                  alt="slide1"
                  className="w-100 h-100"
                />
              </SwiperSlide>
              <SwiperSlide className="new-arrivals__slide">
                <img
                  src={new_arrivals_slide_3}
                  alt="slide1"
                  className="w-100 h-100"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
