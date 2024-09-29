import "./catalogElement.scss";

import { useParams } from "react-router-dom";
import React from "react";

const CatalogElement = () => {
  const { id } = useParams();
  return <div style={{ paddingTop: "500px" }}>"Catalog element": {id}</div>;
};

export default CatalogElement;
