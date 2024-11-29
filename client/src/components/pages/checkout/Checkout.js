import "./checkout.scss";

import { RiShoppingBag4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useRef } from "react";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import pageUp from "../../../features/PageUp";
import Button from "../../buttons/Buttons";
import { setMessage } from "../shoppingCart/shoppingCartSlice";
import { getCities, getCountries, submitOrder } from "./checkoutSlice";
import toastPopupService from "../../../services/toastPopupService";
import Suggested from "./Suggested";
import Preview from "./Preview";

const Checkout = () => {
  const apikey = process.env.REACT_APP_GEO__APIKEY;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { message, products, allGoodsPrice, productsQuantity } = useSelector(
    (state) => state.shoppingCartReducer
  );
  const { status, cities, countries } = useSelector(
    (state) => state.checkoutReducer
  );

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+380");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apartment, setApartment] = useState("");
  const [zip, setZip] = useState("");
  const [order, setOrder] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [suggestedCountries, setSuggestedCountries] = useState([]);

  const [city, setCity] = useState("");
  const [suggestedCities, setSuggestedCities] = useState([]);

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isToastDisable, setToastDisable] = useState(false);

  // ------search country
  const searchCountry = (e) => {
    setSelectedCountry(e.target.value);
    const query = e.target.value;

    fetchCountries(query);
  };

  // ----set country to input
  const setCountryToInput = (country) => {
    setSelectedCountry(country);
    setSuggestedCountries([]);
  };

  // -----fetch countries
  const fetchCountries = async (searchQuery) => {
    if (searchQuery.length < 2) {
      return setSuggestedCountries([]);
    }
    dispatch(getCountries({ searchQuery, apikey }));
    if (countries.geonames) {
      setSuggestedCountries(countries.geonames);
    }
  };

  //  --------fetch cities
  const fetchCities = async (searchQuery) => {
    if (searchQuery.length < 2) {
      return setSuggestedCities([]);
    }
    dispatch(getCities({ searchQuery, apikey }));
    if (cities.geonames) {
      setSuggestedCities(cities.geonames);
    }
  };

  // --------search city
  const searchCity = (e) => {
    setCity(e.target.value);
    const query = e.target.value;
    fetchCities(query);
  };

  //--------- set city to input
  const setCityToInput = (city) => {
    setCity(city);
    setSuggestedCities([]);
  };

  const createOrder = () => {
    const res = products.map(
      ({ name, mainType, counter, parameters, totalPrice }) => {
        const { price } = JSON.parse(parameters);
        return {
          name,
          mainType,
          counter,
          price,
          totalPrice,
        };
      }
    );

    setOrder(res);
  };

  // ---validation
  const phoneLengthValidation =
    phone && phone.length > 4 && phone.length < 13 ? true : false;
  const nameLengthValidation = name && name.length <= 2 ? true : false;

  const phoneCheck = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
    if (input.length > 0) {
      setPhone(`+${input}`);
    } else {
      setPhone("+380");
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
      formdata.append("country", selectedCountry);
      formdata.append("name", name);
      formdata.append("lastName", lastName);
      formdata.append("apartment", apartment);
      formdata.append("zip", zip);
      formdata.append("city", city);
      formdata.append("message", message);
      formdata.append("allGoodsPrice", allGoodsPrice);
      formdata.append("order", JSON.stringify(order));

      // ----submit
      dispatch(submitOrder(formdata));
      // ---clear form
      setEmail("");
      setPhone("+380");
      setSelectedCountry("");
      setName("");
      setLastName("");
      setApartment("");
      setZip("");
      setCity("");
      // ----clear message
      dispatch(setMessage(""));
      // ----navigate
      navigate("/accepted");
      setToastDisable(true);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (isToastVisible) {
      toastPopupService(status, setToastDisable);
    }
  }, [status]);

  useEffect(() => {
    dispatch(setMessage(JSON.parse(localStorage.getItem("message"))));
    createOrder();
    setIsToastVisible(true);
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
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              ref={formRef}
            >
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
                    disabled={isToastDisable}
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
                    disabled={isToastDisable}
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
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    required
                    value={selectedCountry}
                    disabled={isToastDisable}
                    onChange={(e) => searchCountry(e)}
                  />

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please select country.
                  </Form.Control.Feedback>

                  {/* -------suggested countries */}
                  {suggestedCountries.length > 0 &&
                    selectedCountry.length > 2 && (
                      <ul className="list-group checkout__suggested-list">
                        {suggestedCountries &&
                          suggestedCountries.map((elem) => (
                            <Suggested
                              key={elem.geonameId}
                              elem={elem}
                              setToInput={setCountryToInput}
                            />
                          ))}
                      </ul>
                    )}
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
                    disabled={isToastDisable}
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
                    disabled={isToastDisable}
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
                    disabled={isToastDisable}
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
                    disabled={isToastDisable}
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
                    onChange={(e) => searchCity(e)}
                    disabled={isToastDisable}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter city.
                  </Form.Control.Feedback>
                  {/*--------- suggested cities */}
                  {suggestedCities.length > 0 && city.length > 2 && (
                    <ul className="list-group checkout__suggested-list">
                      {suggestedCities &&
                        suggestedCities.map((elem) => (
                          <Suggested
                            key={elem.geonameId}
                            elem={elem}
                            setToInput={setCityToInput}
                            index="city"
                          />
                        ))}
                    </ul>
                  )}
                </Form.Group>
              </Row>

              <Button
                type="submit"
                className={"main-yellow checkout__submit-btn"}
                label="Pay now"
                disabled={isToastDisable}
              />
            </Form>
          </div>
          {/* ---------preview */}
          <Preview />

          <Button
            type="submit"
            className={"main-yellow checkout__submit-btn_small-screen"}
            label="Pay now"
            disabled={isToastDisable}
            onclick={() => formRef.current.requestSubmit()}
          />
        </main>
      </div>
    </div>
  );
};

export default Checkout;
