import "./galleryCard.scss";
import Button from "../buttons/Buttons";
import { useState } from "react";

const GalleryCard = ({ id, ...params }) => {
  const [changePhoto, setChangePhoto] = useState(false);

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

  return (
    <>
      <div
        className="gallery-card"
        onMouseEnter={() => setChangePhoto(true)}
        onMouseLeave={() => setChangePhoto(false)}
      >
        <div className="gallery-card__image">
          <img
            src={`http://localhost:3002/${
              !changePhoto || !picture[2] ? picture[0] : picture[2]
            }`}
            alt="card-image"
          />
        </div>
        <div className="gallery-card__content">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>${price}</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
            onclick={() => console.log(id)}
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button
            className={"grey-stroke__black-hover"}
            label={"quick view"}
            onclick={() => console.log(id)}
          />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>
    </>
  );
};

export default GalleryCard;
