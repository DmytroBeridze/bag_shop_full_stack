import "./header.scss";
import logo from "../../resources/img/header/logo.png";
import basket from "../../resources/icons/header/basket.png";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import BlogNavbarDropdown from "../blogPage/BlogNavbarDropdown";

import {
  scrollbarHide,
  scrollbarShow,
} from "../../features/scrollbarToggle/scrollBarToggle";
import CatalogDropdown from "../catalogPage/CatalogDropdown";

const Header = () => {
  const [dropdown, setDropdown] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showDropdown = (value) => {
    setDropdown(value);
  };

  const popupMenueHendler = () => {
    setModalToggle((modalToggle) => !modalToggle);
    // !modalToggle
    //   ? (document.body.style.position = "fixed")
    //   : (document.body.style.position = "static");

    !modalToggle
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
    // !modalToggle ? scrollbarShow() : scrollbarHide();
  };

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 132) {
          headerRef.current.classList.add("move");
        } else {
          headerRef.current.classList.remove("move");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    !location.pathname.includes("admin") && (
      <div className="header-wrapper">
        <div
          className="header"
          onMouseLeave={() => setDropdown("")}
          ref={headerRef}
        >
          <div className="main-container">
            <Navbar
              expand="lg"
              className="d-flex justify-content-between align-items-center p-0 h-100 position-relative"
            >
              <Navbar.Brand
                href="/"
                className="header__logo"
                style={{ maxWidth: "200px" }}
              >
                <img src={logo} alt="img" className="w-100" />
              </Navbar.Brand>

              <Nav className={`nav ${modalToggle && "show"}`}>
                {/* --------------dropdown */}
                <ul className="nav-list d-flex align-items-center justify-content-between ">
                  <li
                    className="nav-link dropdown"
                    onMouseOver={() => showDropdown(1)}
                  >
                    <NavLink
                      to="/"
                      className="d-flex gap-1 align-items-center"
                      style={({ isActive }) => ({
                        color: isActive ? "#bb7311" : "#ffffff",
                      })}
                      onClick={() => setDropdown(false)}
                    >
                      <h4>HOME</h4>
                      <IoIosArrowDown className="arrow-down" />
                    </NavLink>
                    {/* home dropdown */}
                    <div
                      className={
                        dropdown === 1
                          ? "dropdown-child dropdown-child__home show"
                          : "dropdown-child dropdown-child__home"
                      }
                    >
                      <NavLink to="/">HOME</NavLink>
                      <NavLink to="/about">ABOUT US</NavLink>
                      <NavLink to="/catalog">CATALOG</NavLink>
                      <NavLink to="/blog">BLOG</NavLink>
                    </div>
                  </li>

                  <li
                    className="nav-link dropdown"
                    onMouseOver={() => showDropdown(2)}
                  >
                    <NavLink
                      to="catalog"
                      className="d-flex gap-1 align-items-center"
                      style={({ isActive }) => ({
                        color: isActive ? "#bb7311" : "#ffffff",
                      })}
                      onClick={() => setDropdown(false)}
                    >
                      <h4>CATALOG</h4>
                      <IoIosArrowDown className="arrow-down" />
                    </NavLink>
                  </li>

                  <li
                    className="nav-link dropdown"
                    onMouseOver={() => showDropdown(3)}
                  >
                    <NavLink
                      to="/blog"
                      className="d-flex gap-1 align-items-center"
                      style={({ isActive }) => ({
                        color: isActive ? "#bb7311" : "#ffffff",
                      })}
                      onClick={() => setDropdown(false)}
                    >
                      <h4>BLOG</h4>
                      <IoIosArrowDown className="arrow-down" />
                    </NavLink>
                  </li>

                  <li
                    className="nav-link dropdown"
                    onMouseOver={() => showDropdown(4)}
                  >
                    <NavLink
                      to="/sale"
                      className="d-flex gap-1 align-items-center"
                      style={({ isActive }) => ({
                        color: isActive ? "#bb7311" : "#ffffff",
                      })}
                      onClick={() => setDropdown(false)}
                    >
                      <h4>SALE</h4>
                      <IoIosArrowDown className="arrow-down" />
                    </NavLink>
                  </li>

                  <li
                    className="nav-link dropdown"
                    onMouseEnter={() => setDropdown("")}
                  >
                    <NavLink
                      to="/about"
                      style={({ isActive }) => ({
                        color: isActive ? "#bb7311" : "#ffffff",
                      })}
                    >
                      <h4>ABOUT US</h4>
                    </NavLink>
                  </li>

                  <li
                    className="nav-link dropdown"
                    onMouseEnter={() => setDropdown("")}
                  >
                    <NavLink
                      to="/contact"
                      style={({ isActive }) => ({
                        color: isActive ? "#bb7311" : "#ffffff",
                      })}
                    >
                      <h4>CONTACT US</h4>
                    </NavLink>
                  </li>
                </ul>

                {/* --------------dropdown-content */}
                <div className="dropdown-content">
                  {/* catalog dropdown */}
                  <div
                    className={
                      dropdown === 2
                        ? "dropdown-child dropdown-child__catalog show"
                        : "dropdown-child dropdown-child__catalog "
                    }
                  >
                    <CatalogDropdown dataType="dropdown" />
                  </div>

                  {/* blog dropdown */}
                  <div
                    className={
                      dropdown === 3 ? "dropdown-child show" : "dropdown-child "
                    }
                  >
                    <BlogNavbarDropdown setDropdown={setDropdown} />
                  </div>

                  {/* sale dropdown */}
                  <div
                    className={
                      dropdown === 4 ? "dropdown-child show" : "dropdown-child "
                    }
                  >
                    <a href="http://www.вашдомен.ru/page1.html">HOME4</a>
                    <a href="http://www.вашдомен.ru/page2.html">ABOUT US</a>
                    <a href="http://www.вашдомен.ru/page3.html">CATALOG</a>
                    <a href="http://www.вашдомен.ru/page4.html">BLOG</a>
                  </div>
                </div>
              </Nav>
              <div
                className="basket d-flex gap-2"
                onClick={() => navigate("/cart")}
              >
                <img src={basket} alt="basket" />
                <div className="basket-count">0</div>
              </div>
              {modalToggle ? (
                <CgClose className="burger-icon" onClick={popupMenueHendler} />
              ) : (
                <BiMenu className="burger-icon" onClick={popupMenueHendler} />
              )}
            </Navbar>
          </div>
        </div>
        <BurgerMenu
          modalToggle={modalToggle}
          popupMenueHendler={popupMenueHendler}
        />
      </div>
    )
  );
};

export default Header;
