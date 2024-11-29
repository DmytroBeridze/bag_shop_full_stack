import "./FeaturedItems.scss";

import feturedBag from "../../../resources/img/home/featured-bag.jpg";
import feturedBackpack from "../../../resources/img/home/featured-backpack.png";
import miniBag from "../../../resources/img/home/mini-bag.jpg";
import stylesBag from "../../../resources/img/home/styles-bag.jpg";
import classicBag from "../../../resources/img/home/classic-bag.jpg";

import { useEffect, useRef } from "react";
import useResize from "../../../hooks/resize.hook";
import { useNavigate } from "react-router-dom";

import Button from "../../buttons/Buttons";

const FeaturedItems = () => {
  const ref = useRef([]);
  const navigate = useNavigate();
  const size = useResize();

  // ---Dynamic block height reduction
  useEffect(() => {
    ref.current.forEach((elem) => {
      elem.style.height =
        size[0] > 600
          ? `${Math.floor(size[0] * 0.5)}px`
          : `${Math.floor(size[0] * 2)}px`;
    });
  }, [size]);

  return (
    <>
      {/* featured */}
      <section className="featured-items pt-5">
        <h2 className="featured-items__title text-center pb-5">
          Featured Items
        </h2>
        <div
          className="featured-items__arrivals "
          ref={(elem) => (ref.current[0] = elem)}
        >
          <div className="arrivals__photo ">
            <img src={feturedBackpack} alt="feturedBackpack" />
          </div>

          <div className="arrivals__photo position-relative">
            <div className="arrivals__content">
              <h4 className="arrivals__subtitle">New arrivals</h4>
              <h2 className="arrivals__title">Get an Extra</h2>
              <p>10% off</p>
              <Button
                className={"main-yellow"}
                label={"Shop now"}
                onclick={() => navigate("/catalog/galery/backpacks")}
              />
            </div>
          </div>
          <div className="arrivals__photo position-relative">
            <div className="arrivals__content arrivals__content_new-bag">
              <h4 className="arrivals__subtitle">New arrivals</h4>
              <h2 className="arrivals__title arrivals__title_new-bag">
                Women's Bags <br />
                from Top Brands
              </h2>
              <Button
                className={"main-yellow"}
                label={"Shop now"}
                onclick={() =>
                  navigate("/catalog/galery/handbags", {
                    state: { filter: "crossbody" },
                  })
                }
              />
            </div>
          </div>
          <div className="arrivals__photo">
            <img src={feturedBag} alt="feturedBag" />
          </div>
        </div>

        {/* promo */}
        <div
          className="featured-items__promo mt-5 pt-5 mb-5"
          ref={(elem) => (ref.current[1] = elem)}
        >
          <div className="promo__photo">
            <img src={miniBag} alt="miniBag" />

            <div className="promo__content">
              <h4 className="arrivals__subtitle" style={{ color: "white" }}>
                New arrivals
              </h4>
              <h2 className="promo__title">Faith Mini Bag</h2>
              <p>
                Brit high-street favourites Faith channel a love of fast fashion
                across their trend-led collections of shoes and accessories
              </p>
              <Button
                className={"yellow-stroke"}
                label={"Shop now"}
                onclick={() =>
                  navigate("/newGoods/handbags", {
                    state: { filter: "shoulder bags" },
                  })
                }
              />
            </div>
          </div>

          <div className="promo__photo">
            <img src={stylesBag} alt="stylesBag" />

            <div className="promo__content promo__content_sale">
              <p>Up to 50%</p>
              <h2 className="promo__title">on Select Styles</h2>
              <Button
                className={"white-stroke"}
                label={"Shop now"}
                onclick={() =>
                  navigate("/sale/bags", {
                    state: { filter: "travel bags" },
                  })
                }
              />
            </div>
          </div>
          <div className="promo__photo">
            <img src={classicBag} alt="classicBag" />

            <div className="promo__content promo__content_classic">
              <h2 className="promo__title">New</h2>
              <p>Classic Items</p>
              <Button
                className={"grey-stroke"}
                label={"Shop now"}
                onclick={() =>
                  navigate("/catalog/galery/bags", {
                    state: { filter: "travel bags" },
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedItems;
