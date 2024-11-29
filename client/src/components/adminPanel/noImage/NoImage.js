import Image from "react-bootstrap/Image";
import noImg from "../../../resources/icons/adminPanel/camera.png";

const NoImage = () => {
  return (
    <div className="w-25">
      <Image
        src={noImg}
        rounded
        className="mw-25"
        style={{ with: "80px", height: "80px" }}
      />
    </div>
  );
};

export default NoImage;
