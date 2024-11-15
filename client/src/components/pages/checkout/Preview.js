import "./preview.scss";

import { useSelector } from "react-redux";

const Preview = () => {
  const { products, allGoodsPrice } = useSelector(
    (state) => state.shoppingCartReducer
  );

  return (
    <div className="checkout__preview">
      {/* details block */}
      {products.map((product) => (
        <View product={product} key={product._id} />
      ))}

      <div
        className="d-flex align-items-center justify-content-between mt-5"
        style={{ fontSize: "18px", fontWeight: 600 }}
      >
        <div>Total</div>
        <div>
          <span
            className="me-2"
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            USD
          </span>
          <span>${allGoodsPrice}</span>
        </div>
      </div>
    </div>
  );
};

const View = ({ product }) => {
  const { name, totalPrice, mainType, parameters, picture, counter } = product;
  const { price, color, weight } = JSON.parse(parameters);
  return (
    <div className="checkout__product-summary">
      {/* image block */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="checkout__product-img">
            <img src={`http://localhost:3002/${picture[0]}`} alt="img" />

            <div className="checkout__product-quanity">{counter}</div>
          </div>
          <div className="checkout__product-desc">
            <div>{name}</div>
            <div>{`${mainType} / ${color} / ${weight} kg`}</div>
          </div>
        </div>
        <div className="checkout__product-price">${price}</div>
      </div>
      <div
        className="checkout__product-subtotal"
        style={{
          fontSize: "14px",
          fontWeight: 600,
          background: "rgba(193, 192, 192, 0.20)",
        }}
      >
        <div>Subtotal</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default Preview;
