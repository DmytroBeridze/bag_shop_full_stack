import React, { useEffect, useRef, useState } from "react";
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
  const [picture, setPicture] = useState(null);
  const [sale, setSale] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [isNew, setisNew] = useState(false);
  const [promo, setPromo] = useState(false);

  // parameters
  const [color, setColor] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const parameters = {
    color,
    height,
    width,
    length,
    weight,
    price,
  };

  const photoInput = useRef(null);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearStatus());
    window.localStorage.removeItem("token");
    toastPopupService("You are logged out");
  };
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

  // clear form
  const clearForm = () => {
    setName("");
    setDescription("");
    setMainType("");
    setType("");
    photoInput.current.value = "";
    setPicture(null);
    setSale(false);
    setFeatured(false);
    setisNew(false);
    setPromo(false);
    setColor("");
    setHeight("");
    setWidth("");
    setLength("");
    setWeight("");
    setPrice("");
  };

  // form submit
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
      formData.append("sale", sale);
      formData.append("featured", featured);
      formData.append("new", isNew);
      formData.append("promo", promo);
      formData.append("parameters", JSON.stringify(parameters));

      picture
        ? picture.map((elem) => formData.append("picture", elem))
        : formData.append("picture", null);

      // picture.map((elem) => formData.append("picture", elem));

      dispatch(addGoods(formData));
      // clear form after submit
      setName("");
      photoInput.current.value = "";
      setPicture(null);
      setSale(false);
      setFeatured(false);
      setisNew(false);
      setPromo(false);
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
              <Form.Group md="4" controlId="nameGoods">
                {/* name */}
                <Form.Label>Enter name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  name="name"
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
                {/* <Form.Group md="4" controlId="validationCustom01"> */}
                <Form.Label>Enter description</Form.Label>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Description"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    name="description"
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
              <Form.Group md="4" controlId="validationCustom02">
                <Form.Label> Enter main type</Form.Label>
                <Form.Select
                  type="text"
                  name="main-type"
                  aria-label="Default select example"
                  required
                  onChange={(e) => setMainType(e.target.value)}
                  value={mainType}
                >
                  {/* <option>Choose main type</option> */}
                  <option></option>
                  {/* <option value="DEFAULT" disabled>
                    Choose main type
                  </option> */}
                  <option value="bags & backpacks">Bags & backpacks</option>
                  <option value="hand & clutches">Hand & clutches</option>
                  <option value="luggage">Luggage</option>
                  <option value="stores">Stores</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter main type.
                </Form.Control.Feedback>
              </Form.Group>

              {/* type */}
              <Form.Group md="4">
                <Form.Label>Enter type</Form.Label>
                <Form.Select
                  type="text"
                  name="type"
                  aria-label="Disabled select example"
                  required
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option></option>
                  {/* <option>Choose type</option> */}
                  <option value="carpet">Carpet</option>
                  <option value="handbag">Handbag</option>
                  <option value="laptop">Laptop</option>
                  <option value="leather">Leather</option>
                  <option value="Tote bag">Tote bag</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter type.
                </Form.Control.Feedback>
              </Form.Group>

              {/* checkboxes */}
              <Form.Group md="5">
                <Form.Label>Choose options</Form.Label>

                {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      checked={sale}
                      inline
                      label="sale"
                      name="sale"
                      type={type}
                      id={`inline-${type}-1`}
                      onChange={(e) => setSale(e.target.checked)}
                    />
                    <Form.Check
                      checked={featured}
                      inline
                      label="featured"
                      name="featured"
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <Form.Check
                      checked={isNew}
                      inline
                      label="new"
                      name="new"
                      type={type}
                      id={`inline-${type}-3`}
                      onChange={(e) => setisNew(e.target.checked)}
                    />
                    <Form.Check
                      checked={promo}
                      inline
                      name="promo"
                      label="promo"
                      type={type}
                      id={`inline-${type}-4`}
                      onChange={(e) => setPromo(e.target.checked)}
                    />
                  </div>
                ))}
              </Form.Group>
              {/* file */}

              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Choose image</Form.Label>
                <Form.Control
                  ref={photoInput}
                  multiple
                  name="photo"
                  type="file"
                  placeholder="Photo"
                  onChange={(e) => {
                    const imgArr = Object.values(e.target.files);
                    setPicture(imgArr);
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* parameters */}
            <Form.Group
              md="4"
              // controlId="parameters"
              className="d-flex flex-row bd-highlight mb-3"
            >
              {/* color */}
              <Form.Label>
                Enter color
                <Form.Control
                  type="text"
                  placeholder="Color"
                  value={color}
                  name="color"
                  onChange={(e) => setColor(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Label>
              {/* height */}
              <Form.Label>
                Enter height
                <Form.Control
                  type="text"
                  placeholder="Height"
                  value={height}
                  name="height"
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Label>
              {/* width */}
              <Form.Label>
                Enter width
                <Form.Control
                  type="text"
                  placeholder="Width"
                  value={width}
                  name="width"
                  onChange={(e) => setWidth(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Label>

              {/* length */}
              <Form.Label>
                Enter length
                <Form.Control
                  type="text"
                  placeholder="Length"
                  value={length}
                  name="length"
                  onChange={(e) => setLength(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Label>

              {/* weight */}
              <Form.Label>
                Enter weight
                <Form.Control
                  type="text"
                  placeholder="Weight"
                  value={weight}
                  name="weight"
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Label>

              {/* price */}
              <Form.Label>
                Enter price
                <Form.Control
                  required
                  type="text"
                  placeholder="Price"
                  value={price}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter price.
                </Form.Control.Feedback>
              </Form.Label>
            </Form.Group>

            {/* buttons */}
            <Button type="submit">Submit form</Button>
            <Button type="button" onClick={clearForm}>
              Clear form
            </Button>
          </Form>
        </>
      ) : null}
    </>
  );
};

export default Admin;
