import "./newLabel.scss";

import newLabel from "../../resources/icons/new.png";
// import newLabel from "../../resources/icons/new_label.png";

const NewLabel = () => {
  return (
    <div className="newLabel">
      {/* <h4>new</h4> */}
      <img src={newLabel} alt="" />
    </div>
  );
};

export default NewLabel;
