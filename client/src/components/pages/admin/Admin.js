import "./admin.scss";

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import {
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import toastPopupService from "../../../services/toastPopupService";
import { checkIsAuth, getMe, logout } from "../../../features/auth/authSlice";
import { clearStatus } from "../../pages/admin/adminSlice";

import ImagePopup from "../../adminPanel/imagePopup/ImagePopup";
import { AdminContext } from "../../adminPanel/adminContext";
import Posts from "./Posts";
import Goods from "./Goods";
import UsersContacts from "./UsersContacts";
import UserOrders from "./UserOrders";
import AdminBurger from "./AdminBurger";

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
  const [toggle, setToggle] = useState(false);

  const currentLocation = useLocation();
  const withoutImgPopupLinks = [
    "/admin/panel/usersContacts",
    "/admin/panel/usersOrders",
  ];
  const noImgPopup = !withoutImgPopupLinks.includes(currentLocation.pathname);

  const getTargetId = (id) => {
    setTargetId(id);
  };

  const { status } = useSelector((state) => state.adminReducer);
  const { postStatus } = useSelector((state) => state.postsReducer);
  const { orderStatus } = useSelector((state) => state.userOrderReducer);
  const { contactsStatus } = useSelector((state) => state.displayUsersReducer);

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

  useEffect(() => {
    toastPopupService(orderStatus);
  }, [orderStatus]);

  useEffect(() => {
    toastPopupService(contactsStatus);
  }, [contactsStatus]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearStatus());
    window.localStorage.removeItem("token");
    toastPopupService("You are logged out");
  };

  // popup modal
  const imageModal = (e) => {
    if (openCoef) {
      setActiveClass(true);
      setImgSrc(e.src);
      setOpenCoef(false);
    } else {
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

  const burgerHandler = () => {
    setToggle(!toggle);

    !toggle
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  };

  return (
    <section className="admin">
      <div className="admin__container">
        <header className="admin__header  bd-highlight  border-bottom  mb-2 mb-lg-5 mb-sm-3">
          <h1>Yellow bag admin panel</h1>
          <ul className="admin__nav">
            <li>
              <NavLink to="/admin/panel" end>
                goods
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/panel/posts">posts</NavLink>
            </li>
            <li>
              <NavLink to="/admin/panel/usersContacts">contacts</NavLink>
            </li>
            <li>
              <NavLink to="/admin/panel/usersOrders">orders</NavLink>
            </li>
          </ul>

          <Button variant="danger" onClick={logoutHandler}>
            logout
          </Button>
          {!toggle ? (
            <RxHamburgerMenu
              color="black"
              onClick={burgerHandler}
              className="admin__burger"
            />
          ) : (
            <RxCross2 color="black" className="admin__burger" />
          )}
        </header>

        {isAuth ? (
          <>
            <AdminContext.Provider value={targetId}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Goods imageModal={imageModal} getTargetId={getTargetId} />
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <Posts imageModal={imageModal} getTargetId={getTargetId} />
                  }
                />
                <Route path="/usersContacts" element={<UsersContacts />} />
                <Route path="/usersOrders" element={<UserOrders />} />
              </Routes>

              <Outlet />

              {noImgPopup && (
                <ImagePopup
                  imgSrc={imgSrc}
                  activeClass={activeClass}
                  closeModal={closeModal}
                />
              )}
            </AdminContext.Provider>
          </>
        ) : null}
      </div>
      {/* ------burger */}
      <AdminBurger toggle={toggle} burgerHandler={burgerHandler} />
    </section>
  );
};

export default Admin;
