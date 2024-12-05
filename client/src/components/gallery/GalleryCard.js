import "./galleryCard.scss";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "../buttons/Buttons";
import ImageError from "../error/imageError/ImageError";
import setToLocalStorage from "../../features/setToLocalStorage";
import SaleLabel from "../saleLabel/SaleLabel";
import NewLabel from "../newLabel/NewLabel";

const GalleryCard = ({ id, handleModal, productCartOpen, ...params }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const [changePhoto, setChangePhoto] = useState(false);

  const {
    description,
    name,
    parameters,
    picture,
    sale,

    new: newGoods,
  } = params;

  const { price } = JSON.parse(parameters);

  return (
    <div
      className="gallery-card"
      onMouseEnter={() => setChangePhoto(true)}
      onMouseLeave={() => setChangePhoto(false)}
    >
      <div className="gallery-card__image">
        {picture ? (
          <>
            <img
              src={`${requestUrl}/${picture[2] || picture[0]}`}
              alt="card-image"
              style={!changePhoto ? { display: "none" } : { display: "block" }}
            />
            <img
              src={`${requestUrl}/${picture[0]}`}
              alt="card-image"
              style={changePhoto ? { display: "none" } : { display: "block" }}
            />
          </>
        ) : (
          <ImageError />
        )}
        {/* {picture ? (
          <img
            src={`${requestUrl}/${
              !changePhoto || !picture[2] ? picture[0] : picture[2]
            }`}
            alt="card-image"
          />
        ) : (
          <ImageError />
        )} */}

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
              setToLocalStorage("goods", { ...params, _id: id, counter: 1 });
            }}
          />
        </div>
        {JSON.parse(newGoods) && <NewLabel />}
        {JSON.parse(sale) && <SaleLabel />}
      </div>

      <div className="gallery-card__content">
        <h3>
          <NavLink to={`/catalog/${id}`}>{name} </NavLink>
        </h3>

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
            setToLocalStorage("goods", { ...params, _id: id, counter: 1 });
          }}
        />
      </div>
    </div>
  );
};

export default GalleryCard;
