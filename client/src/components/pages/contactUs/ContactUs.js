import "./contactUs.scss";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { useDispatch, useSelector } from "react-redux";
import pageUp from "../../../features/PageUp";
import Button from "../../buttons/Buttons";
import { sendContacts } from "./contactSlice";
import toastPopupService from "../../../services/toastPopupService";

const ContactUs = () => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+380");
  const [message, setMessage] = useState("");
  const [isNotified, setIsNotified] = useState(true);
  const [active, setActive] = useState(false);
  const { isloading, contactStatus } = useSelector((state) => state.contacts);

  // const notify = () => {
  //   console.log(contactStatus);
  //   if (!contactStatus) return;
  //   if (contactStatus === "Sending successfull.") {
  //     toast.success(contactStatus, {
  //       position: "bottom-right",
  //     });
  //   } else
  //     toast.error(contactStatus, {
  //       position: "bottom-right",
  //     });
  // };

  useEffect(() => {
    if (contactStatus && !isNotified) {
      toastPopupService(contactStatus, setActive);
    }
  }, [contactStatus, isNotified]);

  // validation
  const nameLengthValidation = name && name.length <= 2 ? true : false;
  const phoneLengthValidation =
    phone && phone.length > 4 && phone.length < 13 ? true : false;

  const phoneCheck = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
    if (input.length > 0) {
      // Если вводится хотя бы одна цифра

      setPhone(`+${input}`); // Устанавливаем + с введёнными цифрами
    } else {
      setPhone("+380"); // Если ничего не введено, возвращаем только +380
    }

    if (input.length > 12) {
      setPhone(`+${input.slice(0, 12)}`);
    }
  };

  // ----------submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);

      dispatch(sendContacts(formData));
      setIsNotified(false);
      setActive(true);

      setName("");
      setEmail("");
      setPhone("+380");
      setMessage("");
    }
    setValidated(true);
  };

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());

    pageUp();
  }, []);

  return (
    <div className="contact">
      <ToastContainer />

      <div className="main-container">
        <h1 className="contact__title">Contact us</h1>
        <p className="">
          You can contact us any way that is convenient for you. We are
          available 24/7 via fax, email or telephone. You can also use a quick
          contact form below or visit our office personally. Email us with any
          questions or inquiries. We would be happy to answer you.
        </p>

        {/* --------form */}
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="contact__form"
        >
          <Row className="mb-3">
            {/* -------name */}
            <Col md={4}>
              <Form.Group
                as={Col}
                controlId="formGridName"
                className="contact__form-group"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  required
                  minLength="3"
                  pattern="^[^0-9]+$"
                  disabled={active}
                  onChange={(e) => {
                    setName(e.target.value.replace(/[0-9]/g, ""));
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                {nameLengthValidation ? (
                  <Form.Control.Feedback type="invalid">
                    Please ener more then two characters.
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    Please enter name.
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>

            {/* ---------mail */}
            <Col md={4}>
              <Form.Group
                as={Col}
                controlId="formGridEmail"
                className="contact__form-group"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  pattern="([A-z])+([0-9\-_\+\.])*([A-z0-9\-_\+\.])*@([A-z])+([0-9\-_\+\.])*([A-z0-9\-_\+\.])*[\.]([A-z])+"
                  disabled={active}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter valid mail.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* --------phone */}
            <Col md={4}>
              <Form.Group
                as={Col}
                controlId="formGridPhone"
                className="contact__form-group"
              >
                <Form.Label>Phone</Form.Label>

                <Form.Control
                  value={phone}
                  type="tel"
                  placeholder="Enter phone"
                  pattern="^\+380\d{9}$"
                  disabled={active}
                  onChange={(e) => phoneCheck(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                {phoneLengthValidation ? (
                  <Form.Control.Feedback type="invalid">
                    "Please enter a valid number with at least 10 digits."
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    Please enter phone number.
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          {/* ---------message */}

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              value={message}
              as="textarea"
              rows={3}
              disabled={active}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="main-yellow"
            label="Submit"
            disabled={active}
          ></Button>
        </Form>
      </div>
      <div className="contact__map-container">
        <iframe
          className="contact__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d535.6080856455925!2d34.552136403719125!3d49.58800783348329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d82f5f4e0c7c65%3A0xeeeed377c04e8fd0!2z0YPQuy4g0KHQvtCx0L7RgNC90L7RgdGC0LgsIDMxLCDQn9C-0LvRgtCw0LLQsCwg0J_QvtC70YLQsNCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDM2MDAw!5e1!3m2!1sru!2sua!4v1729876225316!5m2!1sru!2sua"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default memo(ContactUs);
