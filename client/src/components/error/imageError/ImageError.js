import "./imageError.scss";
import noImage from "../../../resources/icons/no-image.png";

const ImageError = () => {
  return (
    <div className="imgError">
      <img src={noImage} alt="noImage" />
    </div>
  );
};

export default ImageError;
