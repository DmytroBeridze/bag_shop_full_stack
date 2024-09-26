import loader from "../../resources/icons/loader.gif";

import React from "react";

const Preloader = () => {
  return (
    <div>
      <img
        src={loader}
        alt="loader"
        className="d-block m-auto mb-5"
        style={{ width: "50px" }}
      />
    </div>
  );
};

export default Preloader;
