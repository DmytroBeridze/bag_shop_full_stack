import "./addedToCart.scss";

import { useDispatch } from "react-redux";
import Button from "../buttons/Buttons";
import { useEffect } from "react";
import { fetchGoodsById } from "../gallery/gallerySlice";
import { useNavigate } from "react-router-dom";

const AddedToCart = ({ oneProduct, quantity = 1, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              src={`http://localhost:3002/${picture[0]}`}
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
                onclick={() => navigate("/cart")}
              />
              <Button
                label="Continue shopping"
                className={"main-yellow"}
                onclick={() => navigate("/catalog")}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default AddedToCart;
