import "./collectionCard.scss";

import ImageError from "../error/imageError/ImageError";
import { NavLink } from "react-router-dom";

const CollectionCard = ({ id, ...params }) => {
  const { mainType, picture, dataLength, sale } = params;

  return (
    <div className="collection-card">
      <div className="collection-card__image">
        {picture ? (
          <img src={`http://localhost:3002/${picture[0]}`} alt="card-image" />
        ) : (
          <ImageError />
        )}
      </div>

      <div className="collection-card__content">
        <h3>
          <NavLink to={`/catalog/${id}`}>{mainType} </NavLink>
        </h3>

        <p>{dataLength} products</p>
      </div>
    </div>
  );
};

export default CollectionCard;
