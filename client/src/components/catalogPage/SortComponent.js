import "./sortComponent.scss";

const SortComponent = ({
  onChangeQuantityGoodsToPage,
  sortGoods,
  quantity,
}) => {
  return (
    <div className="catalog-sort ">
      {/* <form> */}
      <label htmlFor="catalog-quantity">Show: </label>

      <select
        className="form-select"
        name="catalog-quantity"
        id="catalog-quantity"
        value={quantity}
        onChange={(e) => onChangeQuantityGoodsToPage(e)}
      >
        <option value="all">All</option>
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>
        <option value={12}>12</option>
      </select>

      <label htmlFor="catalog-sort">Sort products: </label>
      <select
        className="form-select"
        id="catalog-sort"
        // value={sortByPrice}
        onChange={(e) => sortGoods(e)}
      >
        {/* price */}
        <option value="low" data-attr="price">
          Price: low to high
        </option>
        <option value="high" data-attr="price">
          Price: high to low
        </option>

        {/*name  */}
        <option value="a-z" data-attr="name">
          Name: A-Z
        </option>
        <option value="z-a" data-attr="name">
          Name: Z-A
        </option>
        {/* oldest */}
        <option value="old-new" data-attr="added">
          Oldest to newest
        </option>
        <option value="new-old" data-attr="added">
          Newest to oldest
        </option>
      </select>
      {/* </form> */}
    </div>
  );
};

export default SortComponent;
