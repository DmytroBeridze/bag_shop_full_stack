import "./catalogDropdown.scss";

import { memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CatalogDropdown = memo(
  ({ dataType = "dropdown", productType, productFilter, setDropdown }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const locationPathname = location.pathname.split("/");
    const navigateLink = locationPathname
      .slice(0, locationPathname.length - 1)
      .join("/")
      .replace(/\/+/g, "/");

    const handleFilterClick = (link, filterName) => {
      navigate(`/catalog/galery/${link}`, { state: { filter: filterName } });
    };

    const handleFilterSaleClick = (link, filterName) => {
      navigate(`${navigateLink}/${link}`, { state: { filter: filterName } });
    };

    const links = [
      {
        mainType: "backpacks",
        type: ["hiking", "laptop", "scool"],
      },
      {
        mainType: "bags",
        type: ["business bags", "duffle bags", "laptop bags", "travel bags"],
      },

      {
        mainType: "handbags",
        type: ["crossbody", "mens bags", "shoulder bags", "work totes"],
      },
      {
        mainType: "wallets",
        type: ["mens wallets", "womens wallets"],
      },
    ];

    // -----catalog galery layout productTypes
    const productSubtypes =
      productType && links.find((elem) => elem.mainType === productType);

    const catalogGaleryMainTypeClass = (mainType) =>
      `catalog-dropdown__galery-link ${
        productType === mainType ? "active" : ""
      }`;
    const catalogGaleryTypeClass = (item) =>
      `catalog-dropdown__galery-link ${productFilter === item ? "active" : ""}`;

    // -----dropdown layout
    if (dataType === "dropdown") {
      return (
        <ul className="catalog-dropdown">
          {links.map((elem) => {
            const { mainType, type } = elem;

            return (
              // -----------mainType
              <li key={mainType} className="catalog-dropdown__mainType">
                <Link
                  to={`/catalog/galery/${mainType}`}
                  className="catalog-dropdown__link"
                  onClick={setDropdown}
                >
                  {mainType}
                </Link>

                {/* ---------type */}
                <ul className="catalog-dropdown__type">
                  {type.map((item) => (
                    <li
                      key={item}
                      onClick={() => handleFilterClick(mainType, item)}
                    >
                      <a href="">{item}</a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      );
    }

    // -----catalog galery layout
    if (dataType === "catalogGalery") {
      return (
        <>
          <h4 className="catalog-dropdown__title">Collections</h4>
          <ul
            className="catalog-dropdown catalog-dropdown__galery"
            style={{ flexDirection: "column" }}
          >
            {links.map((elem) => {
              const { mainType } = elem;

              return (
                // -----------mainType
                <li key={mainType} className="catalog-dropdown__mainType">
                  <Link
                    to={`${navigateLink}/${mainType}`}
                    className={catalogGaleryMainTypeClass(mainType)}
                  >
                    {mainType}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---------type */}
          <h4 className="catalog-dropdown__title">Product types</h4>
          <ul
            className=" catalog-dropdown catalog-dropdown__galery"
            style={{ flexDirection: "column" }}
          >
            {productSubtypes.type.map((item) => {
              return (
                <li
                  className={catalogGaleryTypeClass(item)}
                  key={item}
                  onClick={() =>
                    handleFilterSaleClick(productSubtypes.mainType, item)
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </>
      );
    }
  }
);

export default CatalogDropdown;
