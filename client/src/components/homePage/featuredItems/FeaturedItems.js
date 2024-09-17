import "./FeaturedItems.scss";
import feturedBag from "../../../resources/img/home/featured-bag.jpg";
import feturedBackpack from "../../../resources/img/home/featured-backpack.png";
import newBackpack from "../../../resources/img/home/new-backpack.png";
import newBag from "../../../resources/img/home/new-bags.png";

import { useEffect, useRef } from "react";
import useResize from "../../../hooks/resize.hook";
import Button from "../../buttons/Buttons";

const FeaturedItems = () => {
  const ref = useRef();
  const size = useResize();

  // ---Динамічне зменшення висоти блока
  useEffect(() => {
    ref.current.style.height =
      size[0] > 600
        ? `${Math.floor(size[0] * 0.5)}px`
        : `${Math.floor(size[0] * 2)}px`;
  }, [size]);

  // !----Це також робочий варіант адаптації висоти,
  // ! але без застовання кастомного хука
  // const ajustHeight = () => {
  //   const windowWidth = window.innerWidth;
  //   ref.current.style.height = `${windowWidth * 0.5}px`; // 50% от высоты окна
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", ajustHeight);
  // }, []);

  return (
    <>
      {/* featured */}
      <section className="featured-items pt-5 pb-5 ">
        {/* <div className="main-container"> */}
        <div className="featured-items__title text-center pb-5">
          Featured Items
        </div>
        <div className="featured-items__arrivals" ref={ref}>
          <div className="arrivals__photo ">
            <img src={feturedBackpack} alt="feturedBackpack" />
          </div>

          <div className="arrivals__photo position-relative">
            {/* <div className="arrivals__photo d-flex flex-column justify-content-center align-items-center"> */}
            <div className="arrivals__content">
              <h4 className="arrivals__subtitle">New arrivals</h4>
              <h2 className="arrivals__title">Get an Extra</h2>
              <p>10% off</p>
              <Button className={"main-yellow"} label={"Shop now"} />
            </div>
          </div>
          <div className="arrivals__photo position-relative">
            <div className="arrivals__content arrivals__content_new-bag">
              <h4 className="arrivals__subtitle">New arrivals</h4>
              <h2 className="arrivals__title arrivals__title_new-bag">
                Women's Bags <br />
                from Top Brands
              </h2>
              <Button className={"main-yellow"} label={"Shop now"} />
            </div>
          </div>
          <div className="arrivals__photo">
            <img src={feturedBag} alt="feturedBag" />
          </div>
          {/* </div> */}
        </div>
      </section>

      {/* promo */}
      <section className="promo mt-5"></section>
    </>
  );
};

export default FeaturedItems;
