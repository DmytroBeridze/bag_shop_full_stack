import "./catalogElement.scss";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import ModalPopup from "../../modal/Modal";
import AddedToCart from "../../addedToCart/AddedToCart";
import setToLocalStorage from "../../../features/setToLocalStorage";
import Preloader from "../../preloader/Preloader";
import OrderForm from "./OrderForm";
import CatalogSlider from "./CatalogSlider";

import {
  clearOneProductState,
  fetchAllGoods,
  fetchGoodsById,
  productCartOpen,
} from "../../gallery/gallerySlice";
import pageUp from "../../../features/PageUp";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";

const CatalogElement = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { oneProduct, oneProductisloading, oneProductStatus, quantity } =
    useSelector((state) => state.galleryReducer);

  const [valueCounter, setValueCounter] = useState(1);

  // add to local storage
  const addToCart = (data) => {
    dispatch(productCartOpen(valueCounter));

    setToLocalStorage("goods", data);
  };

  const productCartClose = () => {
    dispatch(productCartOpen(null));
  };

  useEffect(() => {
    dispatch(fetchGoodsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", dispatch(clearOneProductState()));
    return () => {
      window.removeEventListener(
        "beforeunload",
        dispatch(clearOneProductState())
      );
    };
  }, []);

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

  if (!oneProduct) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <Preloader />
      </div>
    );
  }

  if (oneProduct) {
    const { picture, name, description, sale } = oneProduct;

    return (
      <section className="catalogElement">
        <div className="main-container position-relative">
          <div className="catalogElement__wrapper">
            <h3 className="catalogElement__title">{name}</h3>

            {/*  order block */}
            <div className="catalogElement__order">
              {/* slider */}
              <CatalogSlider picture={picture} name={name} sale={sale} />
              {/*  order form */}
              <OrderForm
                product={oneProduct}
                valueCounter={valueCounter}
                setValueCounter={setValueCounter}
                addToCart={addToCart}
              />
            </div>

            {/*  description block */}
            <div className="catalogElement__description ">
              <h4>Welcome to the world of fashion.</h4>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* popup */}
        <ModalPopup
          show={quantity ? true : false}
          onHide={productCartClose}
          btnstyle="btn-secondary"
        >
          <AddedToCart oneProduct={oneProduct} quantity={quantity} />
        </ModalPopup>
      </section>
    );
  }
};

export default CatalogElement;
