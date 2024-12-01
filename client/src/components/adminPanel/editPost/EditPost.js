import React, { useContext, useEffect, useRef, useState } from "react";
import trash_icon from "../../../resources/icons/adminPanel/trash-round.png";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import useHttp from "../../../hooks/http.hooks";
import { AdminContext } from "../adminContext";
import { useDispatch } from "react-redux";
import { editPost } from "../addPostsForm/postSlice";

const EditPost = () => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const imageRef = useRef([]);

  const targetId = useContext(AdminContext);
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [picture, setPicture] = useState(null);
  const [newPicture, setNewPicture] = useState(null);

  // deleted images
  const [deletedPicture, setDeletedPicture] = useState([]);

  const dispatch = useDispatch();
  const photoInput = useRef(null);

  const { adminRequest } = useHttp();
  // clear form
  const clearForm = () => {
    setName("");
    setDescription("");
  };

  // find not deleted pictures
  const noDelete = () => {
    let res = imageRef.current.filter(
      (elem) => !deletedPicture.includes(elem.src.replace(`${requestUrl}/`, ""))
    );
    return res.map((elem) => elem.src.replace(`${requestUrl}/`, ""));
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
      formData.append("name", name);
      formData.append("description", description);
      formData.append("deletedPicture", JSON.stringify(deletedPicture));

      newPicture
        ? newPicture.map((elem) => formData.append("newPicture", elem))
        : formData.append("newPicture", null);

      // append not deleted pictures
      formData.append("notDeletedPicture", JSON.stringify(noDelete()));

      dispatch(editPost(formData));
    }

    setValidated(true);
  };

  // get target goods
  const fetchOnePost = async () => {
    const { data } = await adminRequest(
      `${requestUrl}/api/blog/posts/${targetId}`
    );

    setName(data.name);
    setDescription(data.description);

    setPicture(data.picture);
  };

  useEffect(() => {
    fetchOnePost();
  }, []);

  return (
    <section className="d-flex flex-column">
      <div className=""></div>
      <h2 className="mb-3">Edit posts</h2>
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

          {/* photo previev */}
          <div className="photo-prev d-flex gap-3">
            {picture &&
              picture.map((elem, i) => (
                <div className="photo-prev__cont" key={i}>
                  <img
                    src={`${requestUrl}/${elem} `}
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
                        imageRef.current[i].src.replace(`${requestUrl}/`, ""),
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
                setNewPicture(imgArr);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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

export default EditPost;
