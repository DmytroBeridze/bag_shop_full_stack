import "./sort.scss";

import React, { useEffect, useState } from "react";

const Sort = ({ onChangeQuantityGoodsToPage, quantity }) => {
  //   const [quantity, setQuantity] = useState(6);

  return (
    <div>
      <form>
        <label htmlFor="catalog-select">Show: </label>

        <select
          name="catalog-select"
          id="catalog-select"
          value={quantity}
          onChange={(e) => onChangeQuantityGoodsToPage(e)}
        >
          {/* <option value="">--Please choose an option--</option> */}
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
