import "./promoProducts.scss";

import noImage from "../../resources/icons/no-image.png";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Buttons";
import { memo } from "react";
import Preloader from "../preloader/Preloader";

const PromoProducts = memo(({ elemQuantity = 1 }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );
  const promoProducts = goods.filter((elem) => JSON.parse(elem.promo));

  const shufftingPromoProducts = (arr, quantity) => {
    if (arr.length > 2) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    return arr.slice(0, quantity);
  };

  const quantity =
    promoProducts.length - 1 > elemQuantity
      ? elemQuantity
      : promoProducts.length - 1;
  const shufftedProducts = shufftingPromoProducts(promoProducts, quantity);

  if (isloading) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <Preloader />
      </div>
    );
  }
  if (status) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
      </div>
    );
  }

  return shufftedProducts.length ? (
    <div className="promoProducts">
      <h3 className="promoProducts__title">Promo Products</h3>
      {shufftedProducts.map(({ _id, ...params }) => {
        return <View {...params} id={_id} key={_id} requestUrl={requestUrl} />;
      })}
    </div>
  ) : null;
});

const View = ({ id, name, description, parameters, picture, requestUrl }) => {
  const navigate = useNavigate();
  const { price } = JSON.parse(parameters);
  const img = picture.length ? `${requestUrl}/${picture[0]}` : noImage;

  return (
    <div className="promoProducts__card">
      <div className="promoProducts__picture">
        <img src={img} alt="noImg" className="w-100" />
      </div>
      <div className="promoProducts__information">
        <h4 className="promoProducts__name">{name}</h4>
        <p className="promoProducts__description">{description}</p>
        <div className="promoProducts__price">
          <span>Price:</span>
          <span>${price}</span>
        </div>
        <Button
          label="more"
          className=" promoProducts__more-btn grey-stroke__black-hover "
          onclick={() => navigate(`/catalog/${id}`)}
        />
      </div>
    </div>
  );
};

export default PromoProducts;
