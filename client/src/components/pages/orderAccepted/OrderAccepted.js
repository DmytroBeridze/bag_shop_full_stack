import "./orderAccepted.scss";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Preview from "../checkout/Preview";
import Button from "../../buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { setTotalQuantity } from "../shoppingCart/shoppingCartSlice";
import pageUp from "../../../features/PageUp";

const OrderAccepted = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { productsQuantity } = useSelector(
  //     (state) => state.shoppingCartReducer
  //   );

  //   useEffect(() => {
  //     const handleUnload = () => {
  //       localStorage.clear();
  //     };

  //     window.addEventListener("beforeunload", handleUnload);
  //     return window.addEventListener("beforeunload", handleUnload);
  //   }, []);
  useEffect(() => {
    pageUp();
  }, []);
  return (
    <div className="accepted">
      <div className="main-container">
        <div className="accepted__header">
          <h2>Thank You!</h2>
          <p>Your order has been accepted. We will contact you soon. </p>
        </div>
        <div className="accepted__message">
          <div className="accepted__body">
            <Preview />
          </div>
        </div>
        {/* --------buttons */}
        <div className="accepted__buttons">
          {/* <div className="accepted__buttons d-flex justify-content-between"> */}
          <Button
            className="white-stroke"
            label="home"
            onclick={() => {
              navigate("/");
              localStorage.clear();
              dispatch(setTotalQuantity(0));
            }}
          />
          {/* <div className="accepted__buttons"> */}
          <Button
            className="white-stroke"
            label="continue shopping"
            onclick={() => {
              navigate("/catalog");
              localStorage.clear();
              dispatch(setTotalQuantity(0));
            }}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrderAccepted;
