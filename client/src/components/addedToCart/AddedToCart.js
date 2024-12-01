import "./addedToCart.scss";

import Button from "../buttons/Buttons";
import {
  fetchGoodsById,
  productCartOpen,
  productCartOpenFromGalleryCard,
} from "../gallery/gallerySlice";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddedToCart = ({ oneProduct, quantity = 1, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestUrl = process.env.REACT_APP_REQUEST;

  const closeModals = () => {
    dispatch(productCartOpen(null));
    dispatch(productCartOpenFromGalleryCard(null));
  };

  useEffect(() => {
    id && dispatch(fetchGoodsById(id));
  }, []);

  if (oneProduct) {
    const { name, picture } = oneProduct;
    return (
      <section className="addedToCart">
        <h2 className="text-center ">Product added to cart</h2>
        <div className="addedToCart__container">
          <div className="addedToCart__photo">
            <img
              src={`${requestUrl}/${picture[0]}`}
              alt="added"
              className="w-100"
            />
          </div>
          <div className="addedToCart__content">
            <h3>{name}</h3>
            <p>Quantity: {!quantity ? 1 : quantity}</p>
            <div className="addedToCart__buttons">
              <Button
                label="Go to cart"
                className={"main-yellow"}
                onclick={() => {
                  navigate("/cart");
                  closeModals();
                }}
              />
              <Button
                label="Continue shopping"
                className={"main-yellow"}
                onclick={() => {
                  navigate("/catalog");
                  closeModals();
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default AddedToCart;
