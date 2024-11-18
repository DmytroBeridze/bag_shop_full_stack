import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Counter from "../../counter/Counter";
import Button from "../../buttons/Buttons";

import { setProducts } from "./shoppingCartSlice";

const ProductCard = memo(
  ({ smallResize, middleResize, product, deleteElement }) => {
    const dispatch = useDispatch();
    const { name, mainType, picture, counter, parameters, _id } = product;
    const { color, weight, price } = JSON.parse(parameters);

    // --------quantity
    const [quantity, setQuantity] = useState(counter);
    let totalPrice = quantity * price;
    let totalWeight = quantity * weight;

    // -------update products
    const updateProducts = () => {
      const localElem = JSON.parse(localStorage.getItem("goods"));

      const filteredElem =
        localElem &&
        localElem.map((elem) => {
          if (elem._id === _id) {
            return { ...elem, totalPrice, totalWeight, counter: quantity };
          } else return elem;
        });
      localStorage.setItem("goods", JSON.stringify(filteredElem));

      dispatch(setProducts(filteredElem));
    };

    useEffect(() => {
      updateProducts();
    }, [quantity]);

    return (
      <>
        {/* -----width 460px */}
        {smallResize && (
          <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0)" }}>
            {/* -----picture */}
            <td className="table__product-cell ps-0" colSpan="5">
              <div className="table__card-picture">
                <img
                  src={`http://localhost:3002/${picture[0]}`}
                  alt="product"
                />
              </div>
            </td>
          </tr>
        )}

        <tr>
          {/* -----picture */}
          {/* -----main width */}
          {!smallResize && (
            <td className="table__product-cell ps-0">
              <div className="table__card-picture">
                <img
                  src={`http://localhost:3002/${picture[0]}`}
                  alt="product"
                />
              </div>
            </td>
          )}

          {/* -------description */}
          <td
            className={smallResize ? "ps-0" : ""}
            colSpan={smallResize ? "3" : ""}
          >
            <div className="table__card-desc mb-3">
              <h3 className="table__card-title">{name}</h3>
              <div className="table__card-type">
                <span>Product type:</span>{" "}
                <span className="ms-2 table__data">{mainType}</span>
              </div>
              <div className="table__card-type">
                <span>Product color:</span>
                <span className="ms-2 table__data">{color}</span>
              </div>
              <div className="table__card-type">
                <span>Product Weight:</span>
                <span className="ms-2 table__data">{weight} kg</span>
              </div>
            </div>
            <Button
              className="main-yellow table__button"
              label="remove"
              onclick={() => {
                deleteElement(_id);
              }}
            />
          </td>

          {/* ---------price */}
          <td
            className={`${
              middleResize ? "ps-3" : "ps-0"
            } table__price table__data`}
          >
            ${price}
          </td>

          {/* ------counter */}
          <td className="table__counter">
            <div className="d-flex flex-column align-items-center gap-2">
              <Counter valueCounter={quantity} setValueCounter={setQuantity} />
            </div>
          </td>

          {/* ------total */}
          <td className="text-end pe-0 table__total table__data">
            ${totalPrice}
          </td>
        </tr>

        {/*----------width 980px*/}
        {middleResize && (
          <tr className="table__resize">
            <td style={{ display: smallResize && "none" }}></td>

            {/* -----counter */}
            <td
              className={`text-start ${smallResize ? "ps-0" : ""} `}
              colSpan={smallResize ? "3" : ""}
            >
              <div className="d-flex flex-column align-items-start gap-2">
                <Counter
                  valueCounter={quantity}
                  setValueCounter={setQuantity}
                />
              </div>
            </td>

            {/* ----total */}
            <td className="text-end pe-0 table__data">${"totalPrice"}</td>
          </tr>
        )}
      </>
    );
  }
);

export default ProductCard;
