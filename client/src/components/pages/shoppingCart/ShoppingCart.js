import "./shoppingCart.scss";

import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CustomScrollToTop from "../../../features/CustomScrollToTop";
import useResize from "../../../hooks/resize.hook";
import Counter from "../../counter/Counter";
import Button from "../../buttons/Buttons";
import Preloader from "../../preloader/Preloader";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { setMessage, setProducts, setTotalQuantity } from "./shoppingCartSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //-------- resize
  const [middleResize, setMiddleResize] = useState(window.innerWidth <= 980);
  const [smallResize, setSmallResize] = useState(window.innerWidth <= 460);
  let width = useResize()[0];

  const { oneProductisloading, oneProductStatus } = useSelector(
    (state) => state.galleryReducer
  );

  const { products } = useSelector((state) => state.shoppingCartReducer);
  const [total, setTotal] = useState({});

  // -------calculation total data
  const calcTotalData = () => {
    const res = products.reduce(
      (acc, curr) => {
        acc.totalWeight += curr.totalWeight;
        acc.totalPrice += curr.totalPrice;
        acc.totalQuantity += curr.counter;
        return acc;
      },
      { totalWeight: 0, totalPrice: 0, totalQuantity: 0 }
    );
    setTotal(res);
    dispatch(setTotalQuantity(res.totalQuantity));
  };

  // -----------delete
  const deleteElement = (id) => {
    const localElem = JSON.parse(localStorage.getItem("goods"));
    const filteredElem = localElem.filter((elem) => elem._id !== id);
    localStorage.setItem("goods", JSON.stringify(filteredElem));
    dispatch(setProducts(filteredElem));
  };

  useEffect(() => {
    calcTotalData();
  }, [products]);

  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("goods")) || [];
    dispatch(setProducts(parsedData));
  }, []);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
  }, []);

  // ----------resize
  useEffect(() => {
    setMiddleResize(width <= 980);
    setSmallResize(width <= 460);
  }, [width]);

  if (oneProductisloading) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <Preloader />
      </div>
    );
  }
  if (oneProductStatus) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="main-container">
        <h1>Your Shopping Cart</h1>
        {products.length ? (
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
              {/* -----------View */}
              {products.map((product) => (
                <View
                  key={product._id}
                  middleResize={middleResize}
                  smallResize={smallResize}
                  product={product}
                  deleteElement={deleteElement}
                />
              ))}
            </tbody>
            {/*--------- footer */}
            <tfoot>
              {/* ------weight */}
              <tr>
                <td colSpan="5" className="ps-0 pe-0">
                  <div className="d-flex justify-content-between w-100">
                    <span>Total weight</span>
                    <span>{`${total.totalWeight} kg`}</span>
                  </div>
                </td>
              </tr>

              {/* ------price */}
              <tr>
                <td colSpan="5" className="ps-0 pe-0">
                  <div className="d-flex justify-content-between w-100">
                    <span> Total price</span>
                    <span>{`${total.totalPrice} $`}</span>
                  </div>
                </td>
              </tr>

              {/* -------textarea */}
              <tr>
                <td colSpan="5" className="table__note ps-0 pe-0">
                  <div>
                    <p> Add a note to your order</p>
                    <textarea
                      name="note-order"
                      onChange={(e) => dispatch(setMessage(e.target.value))}
                    ></textarea>
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
                      onclick={() => navigate("/catalog")}
                    />
                    {/* ------------------------------------------------------ */}
                    <Button
                      className="grey-stroke cart__button"
                      label="Proceed to checkout"
                      onclick={() => navigate("/checkout")}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          // --------empty cart
          <div className="cart__empty">
            <span>It appears that your cart is currently empty.</span>
            <Link to="/catalog">
              Browse collections to find the products you are interested.
            </Link>
          </div>
        )}
      </div>
      {/* ------scroll to top */}
      <CustomScrollToTop />
    </div>
  );
};

const View = memo(({ smallResize, middleResize, product, deleteElement }) => {
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

    const filteredElem = localElem.map((elem) => {
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
              <img src={`http://localhost:3002/${picture[0]}`} alt="product" />
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
              <img src={`http://localhost:3002/${picture[0]}`} alt="product" />
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
              <Counter valueCounter={quantity} setValueCounter={setQuantity} />
            </div>
          </td>

          {/* ----total */}
          <td className="text-end pe-0 table__data">${"totalPrice"}</td>
        </tr>
      )}
    </>
  );
});

export default memo(ShoppingCart);
