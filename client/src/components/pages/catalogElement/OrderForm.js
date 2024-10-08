import "./orderForm.scss";

import Counter from "../../counter/Counter";

const OrderForm = ({ product, valueCounter, setValueCounter, addToCart }) => {
  const { name, type, parameters } = product;
  const { color, height, width, length, weight, price } =
    JSON.parse(parameters);

  return (
    <div className="catalogElement__order-form">
      <h3>{name}</h3>

      <div className="catalogElement__order-container">
        <div className="catalogElement__order-description">
          <table>
            <tbody>
              <tr className="catalogElement__color">
                <td data-label="type">Type:</td>
                <td style={{ lineHeight: "16px" }}>{type ? type : "-"}</td>
              </tr>
              <tr className="catalogElement__color">
                <td>Color:</td>
                <td>{color ? color : "-"}</td>
              </tr>
              <tr className="catalogElement__weight">
                <td>Weight:</td>
                <td>{weight ? weight : "-"}</td>
              </tr>
              <tr className="catalogElement__height">
                <td>Height:</td>
                <td>{height ? height : "-"}</td>
              </tr>
              <tr className="catalogElement__width">
                <td>Width:</td>
                <td>{width ? width : "-"}</td>
              </tr>
              <tr className="catalogElement__length">
                <td>Length:</td>
                <td>{length ? length : "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="catalogElement__order-block">
          <p className="catalogElement__price">${price * valueCounter}</p>
          <div>
            <p className="mb-3 mt-3">Choose quantity:</p>
            <div className="d-flex align-items-center gap-3">
              <Counter
                setValueCounter={setValueCounter}
                valueCounter={valueCounter}
              />

              <button
                className="custom-button main-yellow catalogElement__button"
                onClick={addToCart}
                disabled={valueCounter < 1}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
