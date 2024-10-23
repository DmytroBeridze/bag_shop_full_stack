import { NavLink } from "react-router-dom";

const CatalogSublist = ({ catalog, popupMenueHendler, clearMenuState }) => {
  const links = ["Bags", "Backpacks", "Handbags", "Wallets"];

  return (
    <ul className={`burger__list_sublist ${catalog && "open-catalog"}`}>
      {links.map((elem) => (
        <li className="burger__list_subelement" key={elem}>
          <NavLink
            to={`/catalog/galery/${elem.toLowerCase()}`}
            onClick={() => {
              popupMenueHendler();
              clearMenuState();
            }}
          >
            <h3 style={{ font: "18px/1.25 Arvo" }}>{elem.toUpperCase()}</h3>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default CatalogSublist;
