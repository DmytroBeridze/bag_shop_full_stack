import "./SaleNavbarDropdown.scss";

import imgPlaceholder from "../../resources/img/blog/blog-img-placeholder.jpg";

import { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SaleNavbarDropdown = memo(({ setDropdown }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const { goods } = useSelector((state) => state.galleryReducer);
  const saleGoods = goods.filter((elem) => elem.sale === "true");
  const navigate = useNavigate();

  const toNavigate = (id) => {
    navigate(`/catalog/${id}`);
    setDropdown && setDropdown(false);
  };
  return (
    <main className="saleNavbarDropdown">
      <ul className="saleNavbarDropdown__list">
        {saleGoods
          .slice(0, 4)
          .map(({ _id, description, name, picture, parameters }) => {
            const { price } = JSON.parse(parameters);

            const img = picture.length
              ? `${requestUrl}/${picture[0]}`
              : imgPlaceholder;
            return (
              <li key={_id}>
                <article
                  className="saleNavbarDropdown__card"
                  onClick={() => toNavigate(_id)}
                >
                  <div className="saleNavbarDropdown__picture">
                    <img src={img} alt="" />
                  </div>

                  <div className="saleNavbarDropdown__content-container">
                    <div className="saleNavbarDropdown__content">
                      <Link
                        to={`/catalog/${_id}`}
                        onClick={() => setDropdown && setDropdown(false)}
                      >
                        <h1 className="saleNavbarDropdown__title">{name}</h1>
                      </Link>
                      <p className="saleNavbarDropdown__price">${price}</p>
                    </div>

                    <p className="saleNavbarDropdown__text">{description}</p>
                  </div>
                </article>
              </li>
            );
          })}
      </ul>
    </main>
  );
});

export default SaleNavbarDropdown;
