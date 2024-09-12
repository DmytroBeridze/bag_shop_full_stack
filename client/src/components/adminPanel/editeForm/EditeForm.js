import "./editeForm.scss";
import trash_icon from "../../../resources/icons/adminPanel/trash-round.png";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import { editGoods } from "../../pages/admin/adminSlice";
import useHttp from "../../../hooks/http.hooks";
import { AdminContext } from "../adminContext";

const EditeForm = () => {
  const imageRef = useRef([]);
  const targetId = useContext(AdminContext);

  const [validated, setValidated] = useState(false);

  // const [id, setId] = useState(targetId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainType, setMainType] = useState("");
  const [type, setType] = useState("");
  const [picture, setPicture] = useState(null);
  const [newPicture, setNewPicture] = useState(null);
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
  // deleted images
  const [deletedPicture, setDeletedPicture] = useState([]);
  // const [notDeletedPicture, setNotDeletedPicture] = useState([]);

  const dispatch = useDispatch();
  const photoInput = useRef(null);

  const { adminRequest } = useHttp();
  // clear form
  const clearForm = () => {
    setName("");
    setDescription("");
    setMainType("");
    setType("");
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

  // validation
  const numReg = /^\d*(\.\d+)?$/;
  const heightValidation = !height.match(numReg) ? false : true;

  // find not deleted pictures
  const noDelete = () => {
    let res = imageRef.current.filter(
      (elem) =>
        !deletedPicture.includes(elem.src.replace("http://localhost:3002/", ""))
    );
    return res.map((elem) => elem.src.replace("http://localhost:3002/", ""));
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
      formData.append("_id", targetId);
      // formData.append("_id", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("mainType", mainType);
      formData.append("type", type);
      formData.append("sale", sale);
      formData.append("featured", featured);
      formData.append("new", isNew);
      formData.append("promo", promo);
      formData.append("parameters", JSON.stringify(parameters));
      formData.append("deletedPicture", JSON.stringify(deletedPicture));

      newPicture
        ? newPicture.map((elem) => formData.append("newPicture", elem))
        : formData.append("newPicture", null);
      // append not deleted pictures
      formData.append("notDeletedPicture", JSON.stringify(noDelete()));

      dispatch(editGoods(formData));
    }

    setValidated(true);
  };

  // get target goods
  const fetchOnePost = async () => {
    const { data } = await adminRequest(
      `http://localhost:3002/api/goods/${targetId}`
    );

    const parameters = JSON.parse(data.parameters);
    const { color, height, length, price, weight, width } = parameters;

    setName(data.name);
    setDescription(data.description);
    setMainType(data.mainType);
    setType(data.type);
    setPicture(data.picture);
    setSale(JSON.parse(data.sale));
    setFeatured(JSON.parse(data.featured));
    setisNew(JSON.parse(data.new));
    setPromo(JSON.parse(data.promo));

    setColor(color);
    setHeight(height);
    setWidth(width);
    setLength(length);
    setWeight(weight);
    setPrice(price);
  };

  useEffect(() => {
    fetchOnePost();
  }, []);

  return (
    <section className="d-flex flex-column">
      <div className=""></div>
      <h2 className="mb-3">Edit goods</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        // className="admin col-4"
      >
        <Row className="d-flex flex-column">
          <Form.Group md="4" controlId="nameGoods" className="mb-4">
            {/* name */}
            <Form.Label className="fw-bolder">Enter name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* desc */}
          <Form.Group md="4" controlId="validationCustom01" className="mb-4">
            <Form.Label className="fw-bolder">Enter description</Form.Label>
            <FloatingLabel controlId="floatingTextarea2" label="Description">
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
          <Form.Group md="4" controlId="validationCustom02" className="mb-4">
            <Form.Label className="fw-bolder"> Enter main type</Form.Label>
            <Form.Select
              type="text"
              name="main-type"
              aria-label="Default select example"
              required
              onChange={(e) => setMainType(e.target.value)}
              value={mainType}
            >
              <option></option>
              <option value="backpacks">Backpacks</option>
              <option value="bags">Bags</option>
              <option value="handbags">Handbags</option>
              <option value="wallets">Wallets</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter main type.
            </Form.Control.Feedback>
          </Form.Group>

          {/* type */}
          <Form.Group md="4" className="mb-4">
            <Form.Label className="fw-bolder">Enter type</Form.Label>
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
              <option value="hiking">Hiking (backpacks)</option>
              <option value="laptop">Laptop (backpacks)</option>
              <option value="scool">Scool (backpacks)</option>

              <option value="business bags">Business bags (bags)</option>
              <option value="duffle bags">Duffle bags (bags)</option>
              <option value="laptop bags">Laptop bags (bags)</option>
              <option value="travel bags">Travel bags (bags)</option>

              <option value="crossbody">Crossbody (handbags)</option>
              <option value="mens bags">Mens bags (handbags)</option>
              <option value="shoulder bags">Shoulder bags (handbags)</option>
              <option value="work totes">Work totes (handbags)</option>

              <option value="mens wallets">Mens wallets (wallets)</option>
              <option value="womens wallets">Womens wallets (wallets)</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter type.
            </Form.Control.Feedback>
          </Form.Group>

          {/* checkboxes */}
          <Form.Group md="5" className="mb-4">
            <Form.Label className="fw-bolder">Choose options</Form.Label>

            {["checkbox"].map((type) => (
              <div key={`inline-${type}`}>
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

          {/* photo previev */}
          <div className="photo-prev d-flex gap-3">
            {picture &&
              picture.map((elem, i) => (
                <div className="photo-prev__cont" key={i}>
                  <img
                    src={`http://localhost:3002/${elem} `}
                    alt="img"
                    className="w-100 h-100 rounded object-fit-cover"
                    ref={(elem) => (imageRef.current[i] = elem)}
                  />
                  <img
                    src={trash_icon}
                    alt="ico"
                    className="photo-prev__ico"
                    onClick={() => {
                      setDeletedPicture((deletedPicture) => [
                        ...deletedPicture,
                        imageRef.current[i].src.replace(
                          "http://localhost:3002/",
                          ""
                        ),
                      ]);
                      imageRef.current[i].classList.add("deleted");
                    }}
                  />
                </div>
              ))}
          </div>

          {/* file */}
          <Form.Group md="4" controlId="validationCustom01" className="mb-4">
            <Form.Label className="fw-bolder">Choose image</Form.Label>

            <Form.Control
              ref={photoInput}
              multiple
              name="photo"
              type="file"
              placeholder="Photo"
              onChange={(e) => {
                const imgArr = Object.values(e.target.files);
                // setPicture(imgArr);
                setNewPicture(imgArr);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          {/* parameters */}
          <Form.Label className="fw-bolder">Enter parameters</Form.Label>
          <Form.Group
            md="4"
            // controlId="parameters"
            className=" mb-4 d-flex flex-row bd-highlight   justify-content-between  flex-wrap gap-2"
          >
            {/* color */}
            <Form.Group>
              <Form.Label className="mb-0 fw-lighter">color</Form.Label>
              <Form.Control
                className="goods__params"
                type="text"
                placeholder="Color"
                value={color}
                name="color"
                onChange={(e) => setColor(e.target.value)}
              />
              <Form.Control.Feedback className="goods__params_feedback">
                Looks good!
              </Form.Control.Feedback>
            </Form.Group>

            {/* height */}
            <Form.Group>
              <Form.Label className="mb-0 fw-lighter">height</Form.Label>
              <Form.Control
                className="goods__params"
                type="text"
                placeholder="Height"
                value={height}
                name="height"
                onChange={(e) => setHeight(e.target.value)}
                pattern="^[ 0-9]+$"
              />
              <Form.Control.Feedback className="goods__params_feedback">
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Only numbers.
              </Form.Control.Feedback>
            </Form.Group>

            {/* width */}
            <Form.Group>
              <Form.Label className="mb-0 fw-lighter">width</Form.Label>
              <Form.Control
                className="goods__params"
                type="text"
                placeholder="Width"
                value={width}
                name="width"
                onChange={(e) => setWidth(e.target.value)}
                pattern="^[ 0-9]+$"
              />
              <Form.Control.Feedback className="goods__params_feedback">
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Only numbers.
              </Form.Control.Feedback>
            </Form.Group>
            {/* length */}
            <Form.Group>
              <Form.Label className="mb-0 fw-lighter">length</Form.Label>
              <Form.Control
                className="goods__params"
                type="text"
                placeholder="Length"
                value={length}
                name="length"
                onChange={(e) => setLength(e.target.value)}
                pattern="^[ 0-9]+$"
              />
              <Form.Control.Feedback className="goods__params_feedback">
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Only numbers.
              </Form.Control.Feedback>
            </Form.Group>
            {/* weight */}
            <Form.Group>
              <Form.Label className="mb-0 fw-lighter">weight</Form.Label>
              <Form.Control
                className="goods__params"
                type="text"
                placeholder="Weight"
                value={weight}
                name="weight"
                onChange={(e) => setWeight(e.target.value)}
                pattern="^[ 0-9]+$"
              />
              <Form.Control.Feedback className="goods__params_feedback">
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Only numbers.
              </Form.Control.Feedback>
            </Form.Group>

            {/* price */}
            <Form.Group>
              <Form.Label className="mb-0 fw-lighter">price</Form.Label>
              <Form.Control
                className="goods__params"
                required
                type="text"
                placeholder="Price"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                pattern="^[ 0-9]+$"
              />
              <Form.Control.Feedback className="goods__params_feedback">
                Looks good!
              </Form.Control.Feedback>

              {heightValidation && price !== "" ? (
                <Form.Control.Feedback type="invalid">
                  Only numbers.
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback
                  type="invalid"
                  className="goods__params_feedback"
                >
                  Please enter price.
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form.Group>
        </Row>

        {/* buttons */}
        <Button type="submit" className="goods__buttons goods__buttons_submit ">
          Submit form
        </Button>
        <Button
          variant="outline-primary"
          type="button"
          className="goods__buttons btn-outline-primary"
          onClick={clearForm}
        >
          Clear form
        </Button>
      </Form>
    </section>
  );
};

export default EditeForm;
