import { NavLink } from "react-router-dom";
import "./burgerMenu.scss";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";

const BurgerMenu = ({ modalToggle, popupMenueHendler }) => {
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(false);

  const menuHandler = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((open) => !open);
    setId(value);
  };

  return (
    <nav className="burger">
      <div
        className={`burger__background ${modalToggle && "show"}`}
        onClick={popupMenueHendler}
      >
        <CgClose className="burger__close-icon" />
      </div>
      <ul className={`burger__list ${modalToggle && "show"}`}>
        {/* Home */}
        <li className="burger__element">
          <NavLink
            to="/"
            onClick={popupMenueHendler}
            className="d-flex justify-content-between align-items-center"
            style={({ isActive }) => ({
              color: isActive ? "#bb7311" : "#292929",
            })}
          >
            Home
            <i
              className={`burger__toggle-icon ${
                open && Id === 1 ? "hide" : "show"
              }`}
              // className={`burger__toggle-icon ${open ? "hide" : "show"}`}
              onClick={(e) => menuHandler(e, 1)}
            ></i>
          </NavLink>

          {/* sublist */}
          <ul
            className={`burger__list_sublist ${
              open && Id === 1 && "open-home"
            }`}
          >
            {/* <ul className={`burger__list_sublist ${open && "open-home"}`}> */}
            <li className="burger__list_subelement">
              <NavLink
                to="/"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/about"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                About us
              </NavLink>
            </li>

            <li className="burger__list_subelement">
              <NavLink
                to="/catalog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Catalog
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/blog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Catalog */}
        <li className="burger__element">
          <NavLink
            to="/catalog"
            onClick={popupMenueHendler}
            style={({ isActive }) => ({
              color: isActive ? "#bb7311" : "#292929",
            })}
          >
            Catalog
            <i
              className={`burger__toggle-icon ${
                open && Id === 2 ? "hide" : "show"
              }`}
              onClick={(e) => menuHandler(e, 2)}
            ></i>
          </NavLink>
          {/* sublist */}
          <ul
            className={`burger__list_sublist ${
              open && Id === 2 && "open-catalog"
            }`}
          >
            <li className="burger__list_subelement">
              <NavLink
                to="/"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/about"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                About us
              </NavLink>
            </li>

            <li className="burger__list_subelement">
              <NavLink
                to="/catalog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Catalog
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/blog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Blog */}
        <li className="burger__element">
          <NavLink
            to="/blog"
            onClick={popupMenueHendler}
            style={({ isActive }) => ({
              color: isActive ? "#bb7311" : "#292929",
            })}
          >
            Blog
            <i
              className={`burger__toggle-icon ${
                open && Id === 3 ? "hide" : "show"
              }`}
              onClick={(e) => menuHandler(e, 3)}
            ></i>
          </NavLink>
          {/* sublist */}
          <ul
            className={`burger__list_sublist ${
              open && Id === 3 && "open-blog"
            }`}
          >
            <li className="burger__list_subelement">
              <NavLink
                to="/"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/about"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                About us
              </NavLink>
            </li>

            <li className="burger__list_subelement">
              <NavLink
                to="/catalog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Catalog
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/blog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Sale */}
        <li className="burger__element">
          <NavLink
            to="/sale"
            onClick={popupMenueHendler}
            style={({ isActive }) => ({
              color: isActive ? "#bb7311" : "#292929",
            })}
          >
            Sale
            <i
              className={`burger__toggle-icon ${
                open && Id === 4 ? "hide" : "show"
              }`}
              onClick={(e) => menuHandler(e, 4)}
            ></i>
          </NavLink>
          {/* sublist */}
          <ul
            className={`burger__list_sublist ${
              open && Id === 4 && "open-blog"
            }`}
          >
            <li className="burger__list_subelement">
              <NavLink
                to="/"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/about"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                About us
              </NavLink>
            </li>

            <li className="burger__list_subelement">
              <NavLink
                to="/catalog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Catalog
              </NavLink>
            </li>
            <li className="burger__list_subelement">
              <NavLink
                to="/blog"
                onClick={() => {
                  popupMenueHendler();
                  setOpen(false);
                }}
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </li>

        {/* About us */}
        <li className="burger__element">
          <NavLink
            to="/about"
            onClick={popupMenueHendler}
            style={({ isActive }) => ({
              color: isActive ? "#bb7311" : "#292929",
            })}
          >
            About us
          </NavLink>
        </li>

        {/* Contact us */}
        <li className="burger__element">
          <NavLink
            to="/contact"
            onClick={popupMenueHendler}
            style={({ isActive }) => ({
              color: isActive ? "#bb7311" : "#292929",
            })}
          >
            Contact us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BurgerMenu;
