import Gallery from "../../gallery/Gallery";
import "./catalog.scss";

const Catalog = () => {
  return (
    <div className="catalog">
      <div className="main-container">
        <h1 className="catalog__title">Catalog</h1>
        <Gallery goodsArray={[]} />
      </div>
    </div>
  );
};

export default Catalog;
