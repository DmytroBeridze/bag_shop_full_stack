import "./Gallery.scss";

import Preloader from "../preloader/Preloader";
import GalleryCard from "./GalleryCard";
import ModalPopup from "../modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { clearOneProductState, fetchGoodsById } from "./gallerySlice";
import QuickView from "../quickWiev/QuickWiev";
import AddedToCart from "../addedToCart/AddedToCart";

const Gallery = forwardRef(
  ({ goodsArray, columns = 4, seeMore = false }, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
      isloading,
      oneProductisloading,
      status,
      oneProduct,
      quantity,
      elemId,
    } = useSelector((state) => state.galleryReducer);

    // ------quantity columns
    const galleryStyle = {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    };

    const [addedCart, setAddedCart] = useState(false);
    const [quontity, setQuontity] = useState(false);

    const [goodsId, setGoodsId] = useState(false);

    // ------show modal FromQuickView
    const productCartOpenFromQuickView = (quantity) => {
      setQuontity(quantity);
    };

    // ------show modal FromGalleryCard
    const productCartOpenFromGalleryCard = (id) => {
      dispatch(clearOneProductState());
      setAddedCart(id);
    };

    useEffect(() => {
      setQuontity(quantity);
    }, [quantity]);

    useEffect(() => {
      setAddedCart(elemId);
    }, [elemId]);

    useEffect(() => {
      if (goodsId) {
        dispatch(clearOneProductState());
        dispatch(fetchGoodsById(goodsId));
      }
    }, [goodsId]);

    const productCartClose = () => {
      setAddedCart(false);
      setQuontity(false);
    };

    // ---------show modal Quick view
    const handleShow = (id) => {
      setGoodsId(id);
    };
    // ---------hide modal
    const handleClose = () => {
      setGoodsId(false);
    };

    if (isloading) {
      return (
        <div style={{ paddingTop: "150px", height: "100vh" }}>
          <Preloader />
        </div>
      );
    }
    if (status) {
      return (
        <div style={{ paddingTop: "150px", height: "100vh" }}>
          <h5 className="text-center mt-5 mb-5 text-danger">
            Loading error...
          </h5>
        </div>
      );
    }

    return (
      <>
        <section className="gallery" ref={ref}>
          <div className="main-container">
            {goodsArray.length ? (
              <div className="gallery__gallery" style={galleryStyle}>
                {goodsArray.map(({ _id, ...params }) => (
                  <GalleryCard
                    key={_id}
                    id={_id}
                    {...params}
                    handleModal={handleShow}
                    productCartOpen={productCartOpenFromGalleryCard}
                  />
                ))}

                {seeMore && (
                  <button
                    className="more"
                    onClick={() => {
                      navigate("/catalog");
                    }}
                  >
                    See more
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center mt-5 fs-3 text-warning">
                No elements
              </div>
            )}
          </div>
        </section>

        {/* modal Quick view */}
        <ModalPopup
          show={goodsId ? true : false}
          onHide={handleClose}
          btnstyle="btn-secondary"
        >
          <QuickView
            oneProduct={oneProductisloading ? null : oneProduct}
            productCartOpen={productCartOpenFromQuickView}
            handleClose={handleClose}
          />
        </ModalPopup>

        {/* modal Added card */}
        <ModalPopup
          show={addedCart || quontity ? true : false}
          onHide={productCartClose}
          btnstyle="btn-secondary"
        >
          <AddedToCart
            oneProduct={oneProductisloading ? null : oneProduct}
            id={addedCart}
            quantity={quontity}
          />
        </ModalPopup>
      </>
    );
  }
);

export default Gallery;
