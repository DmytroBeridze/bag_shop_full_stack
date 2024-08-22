import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIsAuth, getMe, logout } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import { addGoods, clearStatus } from "./adminSlice";
import toastPopupService from "../../../services/toastPopupService";

// import useHttp from "../../../hooks/http.hooks";
// import axios from "axios";

const Admin = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const { status, isLoading } = useSelector((state) => state.adminReducer);

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainType, setMainType] = useState("");
  const [type, setType] = useState("");
  const [picture, setPicture] = useState("");

  console.log(picture);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearStatus());
    window.localStorage.removeItem("token");
    toastPopupService("You are logged out");
  };
  // console.log(Date.now().toString());
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
    // toastPopup();
  }, [status]);

  // form
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("mainType", mainType);
      formData.append("type", type);
      formData.append("picture", picture);

      // dispatch(addGoods({ name, description, mainType, type, picture }));

      dispatch(addGoods(formData));

      setName("");
    }

    setValidated(true);
  };

  return (
    <>
      {isAuth ? (
        <>
          <h2>Admin Panell</h2>
          <button onClick={logoutHandler}>logout</button>

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="admin"
          >
            <Row className="mb-3  d-flex flex-column">
              <Form.Group md="4" controlId="validationCustom01">
                {/* name */}
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  // defaultValue="Mark"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter name.
                </Form.Control.Feedback>
              </Form.Group>

              {/* desc */}
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Description</Form.Label>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Description"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter description.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              {/* mainType */}
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Main Type</Form.Label>
                <Form.Select
                  type="text"
                  aria-label="Default select example"
                  required
                  onChange={(e) => setMainType(e.target.value)}
                  value={mainType}
                >
                  <option>Choose main type</option>
                  {/* <option value="DEFAULT" disabled>
                    Choose main type
                  </option> */}
                  <option value="1">Bags & backpacks</option>
                  <option value="2">Hand & clutches</option>
                  <option value="3">Luggage</option>
                  <option value="3">Stores</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter main type.
                </Form.Control.Feedback>
              </Form.Group>

              {/* type */}
              <Form.Group md="4">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  type="text"
                  aria-label="Disabled select example"
                  required
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  {/* <option></option> */}
                  <option>Choose type</option>
                  <option value="1">Carpet</option>
                  <option value="2">Handbag</option>
                  <option value="3">Laptop</option>
                  <option value="3">Leather</option>
                  <option value="4">Tote bag</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter type.
                </Form.Control.Feedback>
              </Form.Group>

              {/* checkboxes */}
              <Form.Group md="5">
                {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="sale"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="featured"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="new"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="promo"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                  </div>
                ))}
              </Form.Group>
              {/* file */}
              <input
                multiple
                type="file"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                }}
              />
              {/* <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Photo"
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group> */}
            </Row>

            <Button type="submit">Submit form</Button>
          </Form>
        </>
      ) : null}
    </>
  );
};

export default Admin;
