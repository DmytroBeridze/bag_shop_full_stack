import "./sale.scss";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import pageUp from "../../../features/PageUp";
import CatalogGalery from "../../catalogPage/CatalogGalery";

const Sale = () => {
  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );
  const saleItems = goods.filter((elem) => elem.sale !== "false");

  useEffect(() => {
    pageUp();
  }, []);

  return (
    <div className="sale">
      <CatalogGalery
        goods={saleItems}
        isloading={isloading}
        status={status}
        title="Sale"
      />
    </div>
  );
};

export default Sale;
