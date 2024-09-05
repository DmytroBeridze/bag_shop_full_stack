import "./addPostsForm.scss";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import { addPosts } from "./postSlice.js";

const AddPostsForm = () => {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const photoInput = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  // clear form
  const clearForm = () => {
    setName("");
    setDescription("");

    photoInput.current.value = "";
    setPicture(null);
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

      picture
        ? picture.map((elem) => formData.append("picture", elem))
        : formData.append("picture", null);

      dispatch(addPosts(formData));

      // clear form after submit
      setName("");
      photoInput.current.value = "";
      setPicture(null);
    }

    setValidated(true);
  };

  return (
    <section className="d-flex flex-column  posts">
      <div className=""></div>
      <h2 className="mb-3">Add posts</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            {/* <Form.Group md="4" controlId="validationCustom01"> */}
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
                setPicture(imgArr);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* buttons */}
        <Button
          // disabled={!heightValidation}
          type="submit"
          className="posts__buttons posts__buttons_submit "
        >
          Submit form
        </Button>
        <Button
          variant="outline-primary"
          type="button"
          className="posts__buttons btn-outline-primary"
          onClick={clearForm}
        >
          Clear form
        </Button>
      </Form>
    </section>
  );
};

export default AddPostsForm;
