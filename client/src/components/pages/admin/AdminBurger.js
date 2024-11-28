import "./adminBurger.scss";

import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const AdminBurger = ({ toggle, burgerHandler }) => {
  const toggleClass = toggle ? "admin-burger active" : "admin-burger";
  return (
    <div className={`${toggleClass}`}>
      <RxCross2 onClick={burgerHandler} className=" admin-burger__close" />

      <ul className="admin-burger__nav">
        <li>
          <NavLink to="/admin/panel" end onClick={burgerHandler}>
            goods
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/panel/posts" onClick={burgerHandler}>
            posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/panel/usersContacts" onClick={burgerHandler}>
            contacts
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/panel/usersOrders" onClick={burgerHandler}>
            orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminBurger;
