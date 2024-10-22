import "./SaleNavbarDropdown.scss";
import imgPlaceholder from "../../resources/img/blog/blog-img-placeholder.jpg";

import { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SaleNavbarDropdown = memo(({ setDropdown }) => {
  const { goods } = useSelector((state) => state.galleryReducer);
  const saleGoods = goods.filter((elem) => elem.sale === "true");
  const navigate = useNavigate();

  const toNavigate = (id) => {
    navigate(`/catalog/${id}`);
    setDropdown(false);
  };
  return (
    <main className="saleNavbarDropdown">
      <ul className="saleNavbarDropdown__list">
        {saleGoods
          .slice(0, 4)
          .map(({ _id, description, name, picture, parameters }) => {
            const { price } = JSON.parse(parameters);

            const img = picture.length
              ? `http://localhost:3002/${picture[0]}`
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
                  <div className="d-flex align-items-center justify-content-between mt-3 gap-2 ">
                    <Link
                      to={`/catalog/${_id}`}
                      onClick={() => setDropdown(false)}
                    >
                      <h1 className="saleNavbarDropdown__title">{name}</h1>
                    </Link>
                    <p className="saleNavbarDropdown__price">${price}</p>
                  </div>

                  <p className="saleNavbarDropdown__text">{description}</p>
                </article>
              </li>
            );
          })}
      </ul>
    </main>
  );
});

export default SaleNavbarDropdown;
