import "./Gallery.scss";
import Preloader from "../preloader/Preloader";

import GalleryCard from "./GalleryCard";
import ModalPopup from "../modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGoodsById } from "./gallerySlice";
import QuickView from "../quickWiev/QuickWiev";
import AddedToCart from "../addedToCart/AddedToCart";

const Gallery = ({ goodsArray, seeMore = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [goodsId, setGoodsId] = useState(false);
  const [addedCart, setAddedCart] = useState(false);

  const { isloading, status, oneProduct } = useSelector(
    (state) => state.galleryReducer
  );

  // console.log(oneProduct);

  // productCartOpen
  const productCartOpen = (value) => {
    setAddedCart(value);
  };

  const productCartClose = () => {
    setAddedCart(false);
  };

  // show modal
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
      <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
    );
  }
  return (
    <>
      <section className="gallery">
        <div className="main-container">
          <div className="gallery__gallery">
            {goodsArray.map(({ _id, ...params }) => (
              <GalleryCard
                key={_id}
                id={_id}
                {...params}
                handleModal={handleShow}
                productCartOpen={productCartOpen}
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
      {/* modal */}
      <ModalPopup
        show={goodsId ? true : false}
        onHide={handleClose}
        btnstyle="btn-secondary"
      >
        <QuickView
          oneProduct={oneProduct}
          productCartOpen={productCartOpen}
          handleClose={handleClose}
        />
      </ModalPopup>

      <ModalPopup
        show={addedCart ? true : false}
        onHide={productCartClose}
        btnstyle="btn-secondary"
      >
        <AddedToCart oneProduct={oneProduct} id={addedCart} />
      </ModalPopup>
    </>
  );
};

export default Gallery;
