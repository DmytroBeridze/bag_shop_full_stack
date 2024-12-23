import "./adminLogin.scss";

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import toastPopupService from "../../../services/toastPopupService";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { loginFetch } from "../../../features/auth/authSlice";

const AdminLogin = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, status } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (status) {
      toastPopupService(status);
    }
    if (token) {
      navigate("/admin/panel");
    }
  }, [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      dispatch(loginFetch({ name, password }));
      setName("");
      setPassword("");
    }

    setValidated(true);
  };
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="admin__login"
    >
      <Row className="mb-3  d-flex flex-column">
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustomUsername">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            aria-describedby="inputGroupPrepend"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Submit form</Button>
    </Form>
  );
};

export default AdminLogin;
