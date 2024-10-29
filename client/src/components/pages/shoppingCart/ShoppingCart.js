import "./shoppingCart.scss";
import textPicture from "../../../resources/img/catalog/catalog-desc-handbag.jpg";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomScrollToTop from "../../../features/CustomScrollToTop";
import useResize from "../../../hooks/resize.hook";
import Counter from "../../counter/Counter";
import Button from "../../buttons/Buttons";
import { fetchGoodsById } from "../../gallery/gallerySlice";

const ShoppingCart = () => {
  const [valueCounter, setValueCounter] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [products, setProducts] = useState([]);

  const [middleResize, setMiddleResize] = useState(window.innerWidth <= 980);
  const [smallResize, setSmallResize] = useState(window.innerWidth <= 460);
  let width = useResize()[0];

  const { oneProduct } = useSelector((state) => state.galleryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductsData(JSON.parse(localStorage.getItem("goods")));
  }, []);

  // const showProductArr = useCallback(() => {
  //   productsData &&
  //     productsData.map(({ id, counter }) => {
  //       dispatch(fetchGoodsById(id)).then((elem) =>
  //         setProducts((products) => [...products, { ...elem.payload, counter }])
  //       );
  //     });
  // }, [productsData]);

  // !-----мемоізувати
  useEffect(() => {
    productsData &&
      productsData.map(({ id, counter }) => {
        dispatch(fetchGoodsById(id)).then((elem) =>
          setProducts((products) => [...products, { ...elem.payload, counter }])
        );
      });
  }, [productsData]);
  console.log(products);

  useEffect(() => {
    setMiddleResize(width <= 980);
    setSmallResize(width <= 460);
  }, [width]);

  return (
    <div className="cart">
      <div className="main-container">
        <h1>Your Shopping Cart</h1>
        <table className="cart__table table">
          {/* ------head */}
          <thead className="table__head">
            <tr>
              <th className="ps-0" colSpan={smallResize ? "3" : "2"}>
                Product
              </th>
              <th className="ps-0 table__title-price">Price </th>
              <th className="text-center table__quantity">Quantity</th>
              <th className="text-end pe-0 table__total">Total</th>
            </tr>
          </thead>
          {/* --------body */}
          <tbody>
            <View
              middleResize={middleResize}
              smallResize={smallResize}
              valueCounter={valueCounter}
              setValueCounter={setValueCounter}
            />
          </tbody>
          {/*--------- footer */}
          <tfoot>
            {/* ------weight */}
            <tr>
              <td colSpan="5" className="ps-0 pe-0">
                <div className="d-flex justify-content-between w-100">
                  <span>Total weight</span>
                  <span>{`${9.92} lb`}</span>
                </div>
              </td>
            </tr>

            {/* ------price */}
            <tr>
              <td colSpan="5" className="ps-0 pe-0">
                <div className="d-flex justify-content-between w-100">
                  <span> Total price</span> <span>{`${90.92} $`}</span>
                </div>
              </td>
            </tr>

            {/* -------textarea */}
            <tr>
              <td colSpan="5" className="table__note ps-0 pe-0">
                <div>
                  <p> Add a note to your order</p>
                  <textarea name="note-order"></textarea>
                </div>
              </td>
            </tr>

            {/* ------buttons */}
            <tr>
              <td colSpan="5" className="ps-0 pe-0">
                <div className="cart__button-container">
                  <Button
                    className="main-yellow cart__button"
                    label="continue shopping"
                    onclick={() => console.log("!!!")}
                  />
                  <Button
                    className="grey-stroke cart__button"
                    label="Proceed to checkout"
                    onclick={() => console.log("!!!")}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* ------scroll to top */}
      <CustomScrollToTop />
    </div>
  );
};

const View = ({ middleResize, smallResize, valueCounter, setValueCounter }) => {
  return (
    <>
      {/* -----width 460px */}
      {smallResize && (
        <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0)" }}>
          {/* -----picture */}
          <td className="table__product-cell ps-0" colSpan="5">
            <div className="table__card-picture">
              <img src={textPicture} alt="test" />
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
              <img src={textPicture} alt="test" />
            </div>
          </td>
        )}

        {/* -------description */}
        <td
          className={smallResize ? "ps-0" : ""}
          colSpan={smallResize ? "3" : ""}
        >
          <div className="table__card-desc mb-3">
            <h3 className="table__card-title">
              Alexander McQueen Padlock Shopper Small
            </h3>
            <div className="table__card-type">{`Product type: ${"Vintage"}`}</div>
            <div className="table__card-type">
              {`Product color: ${"Tellow"}`}
            </div>
            <div className="table__card-type">{`Product Weight: ${"9"} kg`}</div>
          </div>
          <Button
            className="main-yellow table__button"
            label="remove"
            onclick={() => console.log("!!!")}
          />
        </td>

        {/* ---------price */}
        <td className={`${middleResize ? "ps-3" : "ps-0"} table__price`}>
          $154.00
        </td>
        {/* ------counter */}
        <td className="table__counter">
          <div className="d-flex flex-column align-items-center gap-2">
            <Counter
              valueCounter={valueCounter}
              setValueCounter={setValueCounter}
            />
            <Button
              className="main-yellow table__button"
              label="update"
              onclick={() => console.log("!!!")}
            />
          </div>
        </td>
        {/* ------total */}
        <td className="text-end pe-0 table__total">300</td>
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
                valueCounter={valueCounter}
                setValueCounter={setValueCounter}
              />
              <Button
                className="main-yellow table__button"
                label="update"
                onclick={() => console.log("!!!")}
              />
            </div>
          </td>
          {/* ----total */}
          <td className="text-end pe-0 ">300</td>
        </tr>
      )}
    </>
  );
};

export default ShoppingCart;
