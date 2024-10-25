import { useEffect, useState } from "react";

// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import "./contact us.scss";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { useDispatch } from "react-redux";
import pageUp from "../../../features/PageUp";
import Button from "../../buttons/Buttons";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
          validated={validated}
          onSubmit={handleSubmit}
          className="contact__form"
        >
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group
                as={Col}
                controlId="formGridName"
                className="contact__form-group"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group
                as={Col}
                controlId="formGridEmail"
                className="contact__form-group"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                as={Col}
                controlId="formGridPhone"
                className="contact__form-group"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button type="submit" className="main-yellow" label="Submit"></Button>
          {/* <Button variant="primary" type="submit">
            Submit
          </Button> */}
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

export default ContactUs;
