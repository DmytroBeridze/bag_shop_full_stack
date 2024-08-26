import React, { useEffect } from "react";
import "./adminLogin.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { loginFetch } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastPopupService from "../../../services/toastPopupService";

const AdminLogin = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, status } = useSelector((state) => state.authReducer);

  // popup style
  // let toastPopup = null;
  // switch (status) {
  //   case "Wrong password":
  //   case "User does not exist":
  //     toastPopup = () => toast.error(status, { position: "bottom-right" });
  //     break;
  //   case "You are logged in":
  //     toastPopup = () => toast.success(status, { position: "bottom-right" });
  //     break;
  //   default:
  //     toastPopup = () => toast.info(status, { position: "bottom-right" });
  //     break;
  // }

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
            // defaultValue="Mark"
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

    // <Form>
    //   <Form.Group className="mb-3" controlId="formBasicEmail">
    //     <Form.Label>User name</Form.Label>
    //     <Form.Control type="text" placeholder="Name" />
    //     <Form.Text className="text-muted">
    //       We'll never share your email with anyone else.
    //     </Form.Text>
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="formBasicPassword">
    //     <Form.Label>Password</Form.Label>
    //     <Form.Control type="password" placeholder="Password" />
    //   </Form.Group>

    //   <Button variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
  );
};

export default AdminLogin;
