import React from "react";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import noImg from "../../../resources/icons/adminPanel/camera.png";

const NoImage = () => {
  return (
    <div className="w-25">
      <Image src={noImg} rounded className="w-100" />
    </div>
  );
};

export default NoImage;
