import "./burgerMenu.scss";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

import { Scrollbar } from "react-scrollbars-custom";
import CatalogSublist from "./CatalogSublist";
import BlogSublist from "./BlogSublist";
import SaleSublist from "./SaleSublist";

const BurgerMenu = ({ modalToggle, popupMenueHendler }) => {
  const [home, setHome] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [blog, setBlog] = useState(false);
  const [sale, setSale] = useState(false);

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearMenuState = () => {
    setHome(false);
    setCatalog(false);
    setBlog(false);
    setSale(false);
  };

  return (
    <nav className="burger">
      <div
        className={`burger__background ${modalToggle && "show"}`}
        onClick={popupMenueHendler}
      >
        <CgClose className="burger__close-icon" />
      </div>

      <Scrollbar className={`burger__list ${modalToggle && "show"}`}>
        <ul style={{ padding: "30px", listStyle: "none" }}>
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
                className={`burger__toggle-icon ${home ? "hide" : "show"}`}
                onClick={(e) => {
                  menuHandler(e, 1);
                  setHome(!home);
                }}
              ></i>
            </NavLink>

            {/* sublist */}
            <ul className={`burger__list_sublist ${home && "open-home"}`}>
              <li className="burger__list_subelement">
                <NavLink
                  to="/"
                  onClick={() => {
                    popupMenueHendler();
                    clearMenuState();
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
                    clearMenuState();
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
                    clearMenuState();
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
                    clearMenuState();
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
                className={`burger__toggle-icon ${catalog ? "hide" : "show"}`}
                onClick={(e) => {
                  menuHandler(e, 1);
                  setCatalog(!catalog);
                }}
              ></i>
            </NavLink>

            {/*Catalog sublist */}
            <CatalogSublist
              catalog={catalog}
              popupMenueHendler={popupMenueHendler}
              clearMenuState={clearMenuState}
            />
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
                className={`burger__toggle-icon ${blog ? "hide" : "show"}`}
                onClick={(e) => {
                  menuHandler(e, 3);
                  setBlog(!blog);
                }}
              ></i>
            </NavLink>

            {/*Blog sublist */}
            <BlogSublist
              blog={blog}
              popupMenueHendler={popupMenueHendler}
              clearMenuState={clearMenuState}
            />
          </li>

          {/* Sale */}
          <li className="burger__element">
            <NavLink
              to="/sale/backpacks"
              onClick={popupMenueHendler}
              style={({ isActive }) => ({
                color: isActive ? "#bb7311" : "#292929",
              })}
            >
              Sale
              <i
                className={`burger__toggle-icon ${sale ? "hide" : "show"}`}
                onClick={(e) => {
                  menuHandler(e, 4);
                  setSale(!sale);
                }}
              ></i>
            </NavLink>

            {/* sublist */}
            <SaleSublist
              sale={sale}
              popupMenueHendler={popupMenueHendler}
              clearMenuState={clearMenuState}
            />
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
      </Scrollbar>
    </nav>
  );
};

export default BurgerMenu;
