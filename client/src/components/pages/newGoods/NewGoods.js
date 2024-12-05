import "./newGoods.scss";

import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

import CatalogGalery from "../../catalogPage/CatalogGalery";
import pageUp from "../../../features/PageUp";

const NewGoods = memo(() => {
  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );
  const saleItems = goods.filter((elem) => elem.new !== "false");

  useEffect(() => {
    pageUp();
  }, []);

  return (
    <div className="newGoods">
      <CatalogGalery
        goods={saleItems}
        isloading={isloading}
        status={status}
        title="New Arrivals"
      />
    </div>
  );
});

export default NewGoods;
