import "./shoppingCart.scss";

import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CustomScrollToTop from "../../../features/CustomScrollToTop";
import useResize from "../../../hooks/resize.hook";
import Button from "../../buttons/Buttons";
import Preloader from "../../preloader/Preloader";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import {
  setAllGoodsPrice,
  setMessage,
  setProducts,
  setTotalQuantity,
} from "./shoppingCartSlice";

import Form from "react-bootstrap/Form";
import ProductCard from "./ProductCard";

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
    dispatch(setAllGoodsPrice(res.totalPrice));
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
                <ProductCard
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

                    <Form.Control
                      name="note-order"
                      as="textarea"
                      style={{ height: "100px" }}
                      onChange={(e) => dispatch(setMessage(e.target.value))}
                    />
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

export default memo(ShoppingCart);
