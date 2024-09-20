import "./galleryCard.scss";
import testPhoto from "../../resources/img/home/featured-backpack.png";
import Button from "../buttons/Buttons";

const GalleryCard = () => {
  return (
    <>
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>
      {/* -------------------------------------- */}
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>{" "}
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>{" "}
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>{" "}
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>{" "}
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
          <Button
            className={"grey-stroke__black-hover"}
            label={"add to cart"}
          />
        </div>
      </div>{" "}
      <div className="gallery-card">
        <div className="gallery-card__image">
          <img src={testPhoto} alt="card-image" />
        </div>
        <div className="gallery-card__content">
          <h3>Lorem ipsum...</h3>
          <p>It is like a delicious card, w...</p>
          <p>$315.00</p>

          <Button
            label="quick view"
            className="grey-stroke__black-hover gallery-card__button"
          />
          <Button
            label="add to cart"
            className="grey-stroke__black-hover gallery-card__button"
          />
        </div>

        {/* ---menu-selection */}
        <div className="menu-selection">
          <Button className={"grey-stroke__black-hover"} label={"quick view"} />
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
