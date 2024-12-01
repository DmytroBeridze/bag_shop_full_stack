import "./collectionCard.scss";

import ImageError from "../error/imageError/ImageError";
import { NavLink } from "react-router-dom";

const CollectionCard = ({ id, ...params }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const { mainType, picture, dataLength } = params;

  return (
    <div className="collection-card">
      <div className="collection-card__image">
        {picture ? (
          <img src={`${requestUrl}/${picture[0]}`} alt="card-image" />
        ) : (
          <ImageError />
        )}
      </div>

      <div className="collection-card__content">
        <h3>
          <NavLink to={`/catalog/galery/${mainType}`}>{mainType} </NavLink>
        </h3>

        <p>{dataLength} products</p>
      </div>
    </div>
  );
};

export default CollectionCard;
