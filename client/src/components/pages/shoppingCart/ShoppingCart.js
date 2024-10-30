import "./shoppingCart.scss";
import textPicture from "../../../resources/img/catalog/catalog-desc-handbag.jpg";

import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomScrollToTop from "../../../features/CustomScrollToTop";
import useResize from "../../../hooks/resize.hook";
import Counter from "../../counter/Counter";
import Button from "../../buttons/Buttons";
import { fetchGoodsById } from "../../gallery/gallerySlice";

const ShoppingCart = () => {
  // const [valueCounter, setValueCounter] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalParams, setTotalParams] = useState({ totalPrice: 0 });
  console.log(totalParams);

  const [middleResize, setMiddleResize] = useState(window.innerWidth <= 980);
  const [smallResize, setSmallResize] = useState(window.innerWidth <= 460);
  let width = useResize()[0];

  // const { oneProduct } = useSelector((state) => state.galleryReducer);
  const dispatch = useDispatch();

  // const totalParam = () => {
  //   products.map(({ parameters }) => {
  //     const {weight,}=parameters
  //     console.log(parameters);
  //   });
  // };

  useEffect(() => {
    setProductsData(JSON.parse(localStorage.getItem("goods")) || []);
    // totalParam();
  }, []);

  const getProducts = () => {
    if (productsData && productsData.length) {
      const promises = productsData.map(({ id, counter }) => {
        return dispatch(fetchGoodsById(id)).then((data) => ({
          ...data.payload,
          counter,
        }));
      });
      Promise.all(promises).then((data) => setProducts(data));
    }
  };

  useEffect(() => {
    getProducts();
    // console.log("productsData изменился", productsData);
    // if (
    //   productsData &&
    //   Array.isArray(productsData) &&
    //   productsData.length > 0
    // ) {
    //   const promises = productsData.map(({ id, counter }) => {
    //     return dispatch(fetchGoodsById(id)).then((data) => ({
    //       ...data.payload,
    //       counter,
    //     }));
    //   });
    //   Promise.all(promises).then((data) => {
    //     console.log("Полученные данные", data);

    //     setProducts(data);
    //   });
    // }
  }, [productsData]);

  useEffect(() => {
    setMiddleResize(width <= 980);
    setSmallResize(width <= 460);
  }, [width]);

  // console.log(products);

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
            {products.map((elem) => {
              // console.log(elem);

              return (
                <View
                  element={elem}
                  key={elem._id}
                  middleResize={middleResize}
                  smallResize={smallResize}
                  setTotalParams={setTotalParams}
                />
              );
            })}
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

const View = memo(({ middleResize, smallResize, setTotalParams, element }) => {
  const { counter, name, picture, mainType, parameters } = element;
  const { color, weight, price } = JSON.parse(parameters);
  const image = `http://localhost:3002/${picture[0]}`;

  const [quantity, setQuantity] = useState(counter);
  // const[total,setTotal]=useState(0)
  console.log(+price);

  let total = quantity * price;
  useEffect(() => {
    setTotalParams((totalParams) => ({
      ...totalParams,
      totalPrice: +price + totalParams.totalPrice,
    }));
  }, [quantity]);

  useEffect(() => {
    setTotalParams((totalParams) => ({
      ...totalParams,
      totalPrice: totalParams.totalPrice + total,
    }));
  }, []);

  return (
    <>
      {/* -----width 460px */}
      {smallResize && (
        <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0)" }}>
          {/* -----picture */}
          <td className="table__product-cell ps-0" colSpan="5">
            <div className="table__card-picture">
              <img src={image} alt="test" />
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
              <img src={image} alt="test" />
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
            {/* <div className="table__card-type">{`Product type: ${mainType}`}</div> */}
            <div className="table__card-type">
              <span>Product color:</span>
              <span className="ms-2 table__data">{color}</span>
            </div>
            <div className="table__card-type">
              <span>Product Weight:</span>
              <span className="ms-2 table__data">{weight} kg</span>
            </div>
            {/* <div className="table__card-type">{`Product Weight: ${weight} kg`}</div> */}
          </div>
          <Button
            className="main-yellow table__button"
            label="remove"
            onclick={() => console.log("!!!")}
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
            <Button
              className="main-yellow table__button"
              label="update"
              onclick={() => console.log("!!!")}
            />
          </div>
        </td>
        {/* ------total */}
        <td className="text-end pe-0 table__total table__data">${total}</td>
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
              <Counter valueCounter={quantity} setValueCounter={setQuantity} />
              <Button
                className="main-yellow table__button"
                label="update"
                onclick={() => console.log("!!!")}
              />
            </div>
          </td>
          {/* ----total */}
          <td className="text-end pe-0 table__data">${total}</td>
        </tr>
      )}
    </>
  );
});

export default ShoppingCart;
