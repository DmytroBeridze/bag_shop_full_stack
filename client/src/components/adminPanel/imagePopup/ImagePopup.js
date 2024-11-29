import "./imagePopup.scss";
import { CgCloseO } from "react-icons/cg";

const ImagePopup = ({ imgSrc, activeClass, closeModal }) => {
  let toggle = activeClass ? "imgPopup open" : "imgPopup";
  return (
    <div className={toggle}>
      <CgCloseO className="imgPopup__close" onClick={closeModal} />
      <div className="imgPopup__wrapper">
        <img
          src={imgSrc}
          alt="img"
          className="w-100 h-100 object-fit-cover rounded d-block"
        />
      </div>
    </div>
  );
};

export default ImagePopup;
