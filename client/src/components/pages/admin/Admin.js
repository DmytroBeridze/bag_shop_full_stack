import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIsAuth, getMe, logout } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Admin = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast.error("You are logged out", { position: "bottom-right" });
  };

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token]);

  return (
    <>
      {isAuth ? (
        <>
          <h2>Admin Panell</h2>
          <button onClick={logoutHandler}>logout</button>
        </>
      ) : null}
    </>
  );
};

export default Admin;
