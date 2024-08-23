import "./admin.scss";

import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import toastPopupService from "../../../services/toastPopupService";
import { checkIsAuth, getMe, logout } from "../../../features/auth/authSlice";
import { clearStatus, getGoods } from "../../pages/admin/adminSlice";

import AddGoodsForm from "../../adminPanel/addGoodsForm/AddGoodsForm";
import DisplayGoods from "../../adminPanel/displayGoods/DisplayGoods";

const Admin = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const { status, goods, isLoading } = useSelector(
    (state) => state.adminReducer
  );

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
    dispatch(getGoods());
  }, []);
  useEffect(() => {
    dispatch(getGoods());
  }, [goods]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearStatus());
    window.localStorage.removeItem("token");
    toastPopupService("You are logged out");
  };

  return (
    <section className="admin">
      <div className="admin__container">
        <header className="admin__header mb-5 d-flex flex-row bd-highlight justify-content-between align-items-center border-bottom ">
          <h1>Yellow bag admin panel</h1>
          <Button variant="danger" onClick={logoutHandler}>
            logout
          </Button>
        </header>

        {isAuth ? (
          <div className="d-flex align-items-start justify-content-between gap-5">
            <DisplayGoods />
            <AddGoodsForm />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Admin;
