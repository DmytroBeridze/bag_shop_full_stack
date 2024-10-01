import "./Gallery.scss";
import Preloader from "../preloader/Preloader";

import GalleryCard from "./GalleryCard";
import ModalPopup from "../modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGoodsById, productCartOpen } from "./gallerySlice";
import QuickView from "../quickWiev/QuickWiev";
import AddedToCart from "../addedToCart/AddedToCart";

const Gallery = ({ goodsArray, seeMore = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isloading, status, oneProduct, quantity, elemId } = useSelector(
    (state) => state.galleryReducer
  );

  // useSelector((state) => console.log(state.postsReducer));

  const [addedCart, setAddedCart] = useState(false);
  const [quontity, setQuontity] = useState(false);

  const [goodsId, setGoodsId] = useState(false);

  // show modal FromQuickView
  // const productCartOpenFromQuickView = (quantity) => {
  //   setQuontity(quantity);
  // };

  useEffect(() => {
    setQuontity(quantity);
  }, [quantity]);
  useEffect(() => {
    setAddedCart(elemId);
  }, [elemId]);

  // show modal FromGalleryCard
  // const productCartOpenFromGalleryCard = (id) => {
  //   setAddedCart(id);
  // };

  const productCartClose = () => {
    setAddedCart(false);
    // setQuontity(false);

    dispatch(productCartOpen(null));
  };

  // show modal Quick view
  const handleShow = (id) => {
    setGoodsId(id);
  };
  // hide modal
  const handleClose = () => {
    setGoodsId(false);
  };

  useEffect(() => {
    goodsId && dispatch(fetchGoodsById(goodsId));
  }, [goodsId, goodsId]);

  if (isloading) {
    return <Preloader />;
  } else if (status) {
    return (
      // <h5 className="text-center mt-5 mb-5 text-danger">{status}</h5>
      <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
    );
  }

  return (
    <>
      <section className="gallery">
        <div className="main-container">
          <div className="gallery__gallery">
            {goodsArray &&
              goodsArray.map(({ _id, ...params }) => (
                <GalleryCard
                  key={_id}
                  id={_id}
                  {...params}
                  handleModal={handleShow}
                  // productCartOpen={productCartOpenFromGalleryCard}
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
        </div>
      </section>

      {/* modal Quick view */}
      <ModalPopup
        show={goodsId ? true : false}
        onHide={handleClose}
        btnstyle="btn-secondary"
      >
        <QuickView
          oneProduct={oneProduct}
          // productCartOpen={productCartOpenFromQuickView}
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
          oneProduct={oneProduct}
          id={addedCart}
          quantity={quontity}
        />
      </ModalPopup>
    </>
  );
};

export default Gallery;
