import "./sort.scss";

import { useEffect, useState } from "react";

const Sort = ({
  onChangeQuantityGoodsToPage,
  sortGoodsByPrice,
  quantity,
  sortByPrice,
}) => {
  //   const [quantity, setQuantity] = useState(6);
  console.log(sortByPrice);

  return (
    <div>
      <form>
        <label htmlFor="catalog-quantity">Show: </label>

        <select
          name="catalog-quantity"
          id="catalog-quantity"
          value={quantity}
          onChange={(e) => onChangeQuantityGoodsToPage(e)}
        >
          {/* <option value="">--Please choose an option--</option> */}
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>

        <label htmlFor="catalog-sort">Sort products: </label>
        <select
          className="catalog-sort"
          id="catalog-sort"
          // value={sortByPrice}
          onChange={(e) => sortGoodsByPrice(e)}
        >
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
