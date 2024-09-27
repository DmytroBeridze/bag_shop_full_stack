import "./galleryCard.scss";

import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import Button from "../buttons/Buttons";
import ImageError from "../error/imageError/ImageError";
import getToLocalStorage from "../../features/getToLocalStorage";
import SaleLabel from "../saleLabel/SaleLabel";

const GalleryCard = ({ id, handleModal, productCartOpen, ...params }) => {
  const [changePhoto, setChangePhoto] = useState(false);
  const [goodsId, setGoodsId] = useState(false);

  const {
    createdAt,
    description,
    featured,
    mainType,
    type,
    name,
    parameters,
    picture,
    promo,
    sale,
    new: newGoods,
  } = params;

  const { color, height, width, length, weight, price } =
    JSON.parse(parameters);

  // // show modal
  // const handleShow = (state) => {
  //   setGoodsId(state);
  // };
  // // hide modal
  // const handleClose = () => {
  //   setGoodsId(false);
  // };
  return (
    <div
      className="gallery-card"
      onMouseEnter={() => setChangePhoto(true)}
      onMouseLeave={() => setChangePhoto(false)}
    >
      <div className="gallery-card__image">
        {picture ? (
          <img
            src={`http://localhost:3002/${
              !changePhoto || !picture[2] ? picture[0] : picture[2]
            }`}
            alt="card-image"
          />
        ) : (
          <ImageError />
        )}

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button
            className={"grey-stroke__black-hover"}
            label={"quick view"}
            onclick={() => handleModal(id)}
          />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
            onclick={() => {
              productCartOpen(id);
              getToLocalStorage("goods", id);
            }}
          />
        </div>
      </div>

      <div className="gallery-card__content">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>${price}</p>

        <Button
          label="quick view"
          className="grey-stroke__black-hover gallery-card__button"
          onclick={() => handleModal(id)}
        />
        <Button
          label="add to cart"
          className="grey-stroke__black-hover gallery-card__button"
          onclick={() => {
            productCartOpen(id);
            getToLocalStorage("goods", id);
          }}
        />
      </div>

      {/* sale label */}
      {JSON.parse(sale) && <SaleLabel />}
    </div>
  );
};

export default GalleryCard;
