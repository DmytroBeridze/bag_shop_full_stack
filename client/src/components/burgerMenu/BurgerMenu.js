import "./burgerMenu.scss";
import { CgClose } from "react-icons/cg";

import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { dropdownMenuScrollbarShow } from "../../features/scrollbarToggle/scrollBarToggle";

import { Scrollbar } from "react-scrollbars-custom";

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
          {/* <ul className={`burger__list ${modalToggle && "show"}`}> */}
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
            {/* sublist */}
            <ul className={`burger__list_sublist ${catalog && "open-catalog"}`}>
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
            {/* sublist */}
            <ul className={`burger__list_sublist ${blog && "open-blog"}`}>
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
                className={`burger__toggle-icon ${sale ? "hide" : "show"}`}
                onClick={(e) => {
                  menuHandler(e, 4);
                  setSale(!sale);
                }}
              ></i>
            </NavLink>
            {/* sublist */}
            <ul className={`burger__list_sublist ${sale && "open-sale"}`}>
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

// !-------------------
// import { NavLink } from "react-router-dom";
// import "./burgerMenu.scss";
// import { CgClose } from "react-icons/cg";
// import { useEffect, useState } from "react";

// const BurgerMenu = ({ modalToggle, popupMenueHendler }) => {
//   const [open, setOpen] = useState(false);
//   const [Id, setId] = useState(false);

//   const menuHandler = (e, value) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setOpen((open) => !open);
//     setId(value);
//   };

//   return (
//     <nav className="burger">
//       <div
//         className={`burger__background ${modalToggle && "show"}`}
//         onClick={popupMenueHendler}
//       >
//         <CgClose className="burger__close-icon" />
//       </div>
//       <ul className={`burger__list ${modalToggle && "show"}`}>
//         {/* Home */}
//         <li className="burger__element">
//           <NavLink
//             to="/"
//             onClick={popupMenueHendler}
//             className="d-flex justify-content-between align-items-center"
//             style={({ isActive }) => ({
//               color: isActive ? "#bb7311" : "#292929",
//             })}
//           >
//             Home
//             <i
//               className={`burger__toggle-icon ${
//                 open && Id === 1 ? "hide" : "show"
//               }`}
//               // className={`burger__toggle-icon ${open ? "hide" : "show"}`}
//               onClick={(e) => menuHandler(e, 1)}
//             ></i>
//           </NavLink>

//           {/* sublist */}
//           <ul
//             className={`burger__list_sublist ${
//               open && Id === 1 && "open-home"
//             }`}
//           >
//             {/* <ul className={`burger__list_sublist ${open && "open-home"}`}> */}
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/about"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 About us
//               </NavLink>
//             </li>

//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/catalog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Catalog
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/blog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Blog
//               </NavLink>
//             </li>
//           </ul>
//         </li>

//         {/* Catalog */}
//         <li className="burger__element">
//           <NavLink
//             to="/catalog"
//             onClick={popupMenueHendler}
//             style={({ isActive }) => ({
//               color: isActive ? "#bb7311" : "#292929",
//             })}
//           >
//             Catalog
//             <i
//               className={`burger__toggle-icon ${
//                 open && Id === 2 ? "hide" : "show"
//               }`}
//               onClick={(e) => menuHandler(e, 2)}
//             ></i>
//           </NavLink>
//           {/* sublist */}
//           <ul
//             className={`burger__list_sublist ${
//               open && Id === 2 && "open-catalog"
//             }`}
//           >
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/about"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 About us
//               </NavLink>
//             </li>

//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/catalog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Catalog
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/blog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Blog
//               </NavLink>
//             </li>
//           </ul>
//         </li>

//         {/* Blog */}
//         <li className="burger__element">
//           <NavLink
//             to="/blog"
//             onClick={popupMenueHendler}
//             style={({ isActive }) => ({
//               color: isActive ? "#bb7311" : "#292929",
//             })}
//           >
//             Blog
//             <i
//               className={`burger__toggle-icon ${
//                 open && Id === 3 ? "hide" : "show"
//               }`}
//               onClick={(e) => menuHandler(e, 3)}
//             ></i>
//           </NavLink>
//           {/* sublist */}
//           <ul
//             className={`burger__list_sublist ${
//               open && Id === 3 && "open-blog"
//             }`}
//           >
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/about"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 About us
//               </NavLink>
//             </li>

//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/catalog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Catalog
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/blog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Blog
//               </NavLink>
//             </li>
//           </ul>
//         </li>

//         {/* Sale */}
//         <li className="burger__element">
//           <NavLink
//             to="/sale"
//             onClick={popupMenueHendler}
//             style={({ isActive }) => ({
//               color: isActive ? "#bb7311" : "#292929",
//             })}
//           >
//             Sale
//             <i
//               className={`burger__toggle-icon ${
//                 open && Id === 4 ? "hide" : "show"
//               }`}
//               onClick={(e) => menuHandler(e, 4)}
//             ></i>
//           </NavLink>
//           {/* sublist */}
//           <ul
//             className={`burger__list_sublist ${
//               open && Id === 4 && "open-blog"
//             }`}
//           >
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/about"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 About us
//               </NavLink>
//             </li>

//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/catalog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Catalog
//               </NavLink>
//             </li>
//             <li className="burger__list_subelement">
//               <NavLink
//                 to="/blog"
//                 onClick={() => {
//                   popupMenueHendler();
//                   setOpen(false);
//                 }}
//               >
//                 Blog
//               </NavLink>
//             </li>
//           </ul>
//         </li>

//         {/* About us */}
//         <li className="burger__element">
//           <NavLink
//             to="/about"
//             onClick={popupMenueHendler}
//             style={({ isActive }) => ({
//               color: isActive ? "#bb7311" : "#292929",
//             })}
//           >
//             About us
//           </NavLink>
//         </li>

//         {/* Contact us */}
//         <li className="burger__element">
//           <NavLink
//             to="/contact"
//             onClick={popupMenueHendler}
//             style={({ isActive }) => ({
//               color: isActive ? "#bb7311" : "#292929",
//             })}
//           >
//             Contact us
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default BurgerMenu;
