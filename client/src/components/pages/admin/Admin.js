import "./admin.scss";

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import toastPopupService from "../../../services/toastPopupService";
import { checkIsAuth, getMe, logout } from "../../../features/auth/authSlice";
import { clearStatus, getGoods } from "../../pages/admin/adminSlice";

import AddGoodsForm from "../../adminPanel/addGoodsForm/AddGoodsForm";
import DisplayGoods from "../../adminPanel/displayGoods/DisplayGoods";
import ImagePopup from "../../adminPanel/imagePopup/ImagePopup";
import { AdminContext } from "../../adminPanel/adminContext";
import AddPostsForm from "../../adminPanel/addPostsForm/AddPostsForm";
import DisplayPosts from "../../adminPanel/displayPosts/DisplayPosts";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";

// import ModalPopup from "../../modal/Modal";
// import EditeForm from "../../adminPanel/editeForm/EditeForm";

const Admin = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  // img popup
  const [imgSrc, setImgSrc] = useState("");
  const [activeClass, setActiveClass] = useState(false);
  const [openCoef, setOpenCoef] = useState(true);
  const [targetId, setTargetId] = useState();

  const getTargetId = (id) => {
    setTargetId(id);
  };

  // const [modalShow, setModalShow] = React.useState(false);

  const { status } = useSelector((state) => state.adminReducer);
  const { postStatus } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  useEffect(() => {
    toastPopupService(status);
  }, [status]);

  useEffect(() => {
    toastPopupService(postStatus);
  }, [postStatus]);

  // TODO----Що краще, залежність від status, чи конструкція з промісу в AddGoodsForm?
  useEffect(() => {
    dispatch(getGoods());
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, postStatus]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearStatus());
    window.localStorage.removeItem("token");
    toastPopupService("You are logged out");
  };

  // popup modal
  const imageModal = (e) => {
    // при першому натисканні без затримки
    if (openCoef) {
      setActiveClass(true);
      setImgSrc(e.src);
      setOpenCoef(false);
    } else {
      // при не перших натисканнях з затримкою
      setActiveClass(false);
      setTimeout(() => {
        setActiveClass(true);
        setImgSrc(e.src);
      }, 300);
    }
  };

  const closeModal = () => {
    setActiveClass(false);
    setOpenCoef(true);
  };

  return (
    <section className="admin ">
      <div className="admin__container">
        <header className="admin__header mb-2 mb-lg-5 mb-sm-3 d-flex flex-row bd-highlight justify-content-between align-items-center border-bottom ">
          <h1>Yellow bag admin panel</h1>
          <Button variant="danger" onClick={logoutHandler}>
            logout
          </Button>
        </header>

        {isAuth ? (
          <>
            <AdminContext.Provider value={targetId}>
              <div className="admin__goods-container">
                {/* <div className="d-flex flex-row bd-highlight justify-content-between admin__goods-container"> */}
                <DisplayGoods
                  imageModal={imageModal}
                  getTargetId={getTargetId}
                />
                <AddGoodsForm />
              </div>

              <div className="admin__posts-container ">
                {/* <div className="d-flex flex-row bd-highlight justify-content-between admin__goods-container"> */}
                <DisplayPosts
                  imageModal={imageModal}
                  getTargetId={getTargetId}
                />
                <AddPostsForm />
              </div>
              <ImagePopup
                imgSrc={imgSrc}
                activeClass={activeClass}
                closeModal={closeModal}
              />
            </AdminContext.Provider>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Admin;
