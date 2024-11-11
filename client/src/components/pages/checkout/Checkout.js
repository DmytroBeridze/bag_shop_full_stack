import { useEffect } from "react";
import "./checkout.scss";

import { RiShoppingBag4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import pageUp from "../../../features/PageUp";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Button from "../../buttons/Buttons";

const Checkout = () => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+380");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apartment, setApartment] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  // ---validation
  const phoneLengthValidation =
    phone && phone.length > 4 && phone.length < 13 ? true : false;
  const nameLengthValidation = name && name.length <= 2 ? true : false;

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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("selectedCountry", selectedCountry);
      formdata.append("name", name);
      formdata.append("lastName", lastName);
      formdata.append("apartment", apartment);
      formdata.append("zip", zip);
      formdata.append("city", city);
      console.log(Object.fromEntries(formdata));

      // ---clear form
      setEmail("");
      setPhone("+380");
      setSelectedCountry("");
      setName("");
      setLastName("");
      setApartment("");
      setZip("");
      setCity("");
    }

    setValidated(true);
  };

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);
  return (
    <div className="checkout">
      {/* -----header */}
      <div className="checkout__header">
        <div className="main-container">
          <div className="checkout__nav">
            <span>
              <Link to="/">Yellow Bag</Link>
            </span>
            <span>
              <Link to="/cart">
                <RiShoppingBag4Line className="bagIcon" />
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* -----main */}
      <div className="main-container">
        <main className="checkout__main">
          <div className="checkout__confirmation">
            {/* ----------form */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                {/* -----mail */}
                <Form.Label>Contact</Form.Label>
                <Form.Group as={Col} md="6" controlId="email" className="mb-3">
                  <Form.Control
                    value={email}
                    type="email"
                    placeholder="Email"
                    pattern="([A-z])+([0-9\-_\+\.])*([A-z0-9\-_\+\.])*@([A-z])+([0-9\-_\+\.])*([A-z0-9\-_\+\.])*[\.]([A-z])+"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid mail.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ---------phone */}
                <Form.Group as={Col} md="6" controlId="email" className="mb-3">
                  <Form.Control
                    type="tel"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => phoneCheck(e)}
                    pattern="^\+380\d{9}$"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                  {phoneLengthValidation ? (
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid number with at least 10 digits.
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback type="invalid">
                      Please enter phone number.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* -------delivery */}
                <Form.Label>Delivery</Form.Label>
                <Form.Group className="mb-3" controlId="country">
                  <Form.Select
                    required
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Country/Region
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please select country.
                  </Form.Control.Feedback>
                </Form.Group>

                {/*------- name */}
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3"
                  controlId="first-name"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value.replace(/[0-9]/g, ""));
                    }}
                    minLength="3"
                    pattern="^[^0-9]+$"
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

                {/* -------last name */}
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3"
                  controlId="last-name"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value.replace(/[0-9]/g, ""))
                    }
                    minLength="3"
                    pattern="^[^0-9]+$"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  {nameLengthValidation ? (
                    <Form.Control.Feedback type="invalid">
                      Please ener more then two characters.
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback type="invalid">
                      Please enter last name.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* --------Apartment */}
                <Form.Group
                  as={Col}
                  md="12"
                  className="mb-3"
                  controlId="apartment"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter apartment.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* -------Zip */}
                <Form.Group as={Col} md="6" className="mb-3" controlId="zip">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Zip"
                    value={zip}
                    onChange={(e) =>
                      setZip(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter only numbers.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ----------City */}
                <Form.Group as={Col} md="6" className="mb-3" controlId="city">
                  <Form.Control
                    required
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter city.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button
                type="submit"
                className={"main-yellow checkout__submit-btn"}
                label=" Pay now"
                // onclick={() => {
                //   console.log("!!!!");
                // }}
              />
            </Form>
          </div>
          <div className="checkout__preview"></div>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
