import "./addedToCart.scss";

const AddedToCart = ({ oneProduct, quantity }) => {
  const { name, picture } = oneProduct;
  return (
    <>
      <h2 className="text-center">Product added to cart</h2>
      <div className="addedToCart">
        <div className="addedToCart__photo">
          <img
            src={`http://localhost:3002/${picture[0]}`}
            alt="added"
            className="w-100"
          />
        </div>

        <div className="addedToCart__content">
          <h3>{name}</h3>
          <p>Quantity: {quantity}</p>
          <div className="addedToCart__buttons">
            <button>Go to cart</button>
            <button>Continue shipping</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddedToCart;
