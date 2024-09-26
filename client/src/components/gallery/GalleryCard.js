import "./galleryCard.scss";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../buttons/Buttons";
import ModalPopup from "../modal/Modal";
import ImageError from "../error/imageError/ImageError";

const GalleryCard = ({ id, handleModal, ...params }) => {
  const [changePhoto, setChangePhoto] = useState(false);

  // const { mainfilterType } = useSelector((state) => state.mainFilterReducer);

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

  const dispatch = useDispatch();
  const [goodsId, setGoodsId] = useState(false);
  // show modal
  const handleShow = (state) => {
    setGoodsId(state);
  };
  // hide modal
  const handleClose = () => {
    setGoodsId(false);
  };
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
        />
      </div>

      <ModalPopup show={goodsId ? true : false} onHide={handleClose}>
        {goodsId}
      </ModalPopup>
    </div>
  );
};

export default GalleryCard;
