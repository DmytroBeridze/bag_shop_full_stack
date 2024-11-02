import "./shoppingCart.scss";
import textPicture from "../../../resources/img/catalog/catalog-desc-handbag.jpg";

import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomScrollToTop from "../../../features/CustomScrollToTop";
import useResize from "../../../hooks/resize.hook";
import Counter from "../../counter/Counter";
import Button from "../../buttons/Buttons";
import { fetchAllGoods, fetchGoodsById } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import pageUp from "../../../features/PageUp";
import Preloader from "../../preloader/Preloader";
import { setTotalQuantity } from "./shoppingCartSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { oneProductisloading, oneProductStatus } = useSelector(
    (state) => state.galleryReducer
  );
  // const { productsQuantity } = useSelector(
  //   (state) => state.shoppingCartReducer
  // );

  const [test, setTest] = useState([]);

  const [middleResize, setMiddleResize] = useState(window.innerWidth <= 980);
  const [smallResize, setSmallResize] = useState(window.innerWidth <= 460);
  let width = useResize()[0];

  // -------масив з counter,  загальним прайсом для кожного товара.(щтримано з локалу)
  // ------ для пошуку в загальному масиві товаоів
  const [productsData, setProductsData] = useState([]);

  // ------кінцевий масив з продуктами для рендерингу
  const [products, setProducts] = useState([]);

  //--------Тут загальний прайс і маса для кожного товару при зміні  лічільника
  const [totalParams, setTotalParams] = useState({});
  //--------Тут загальний прайс і маса при зміні  лічільника
  const [totalSum, setTotalSum] = useState([]);

  // --------отримання з локалу товарів
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("goods"));
    // const storedProducts = JSON.parse(localStorage.getItem("goods")) || [];
    console.log(storedProducts);

    setProductsData(storedProducts);
  }, []);

  // useEffect(() => {
  //   const storedProducts = JSON.parse(localStorage.getItem("goods"));
  //   // const storedProducts = JSON.parse(localStorage.getItem("goods")) || [];
  //   console.log(storedProducts);

  //   setProductsData(storedProducts);
  // }, [test]);

  // --------get products
  // ---отримання масиву товарыв готових до рендерингу
  const getProducts = () => {
    if (productsData && productsData.length) {
      const promises = productsData.map(({ id, counter }) => {
        return dispatch(fetchGoodsById(id)).then((data) => ({
          ...data.payload,
          counter,
        }));
      });

      Promise.all(promises).then((data) => {
        console.log(data);

        setProducts(data);
      });
    }
  };

  // console.log(totalParams);

  // --------find total sum
  const findTotalSum = () => {
    const values = Object.values(totalParams);

    const totalValues = values.reduce(
      (acc, curr) => {
        acc.totalQuantity += curr.quantity;
        acc.totalPrice += curr.totalPrice;
        acc.totalWeight += curr.totalWeight;
        return acc;
      },
      {
        totalQuantity: 0,
        totalPrice: 0,
        totalWeight: 0,
      }
    );
    setTotalSum(totalValues);
  };

  // const findTotalSum = () => {
  //   const values = Object.values(totalParams);

  //   const { totalprice, totalWeight, totalQuantity } = values.reduce(
  //     (acc, curr) => {
  //       acc.totalprice += curr.totalPrice;
  //       acc.totalWeight += curr.totalWeight;
  //       acc.totalQuantity += curr.quantity;
  //       return acc;
  //     },
  //     { totalprice: 0, totalWeight: 0, totalQuantity: 0 }
  //   );

  //   setTotalSum({ totalprice, totalWeight, totalQuantity });
  // };
  // !----------моє рішення
  // const findTotalSum = () => {
  //   const res = [];

  //   for (const key in totalParams) {
  //     res.push(totalParams[key]);
  //   }
  //   const totalprice = res.reduce((acc, curr) => {
  //     return acc + curr.totalPrice;
  //   }, 0);
  //   const totalWeight = res.reduce((acc, curr) => {
  //     return acc + curr.totalWeight;
  //   }, 0);
  //   const totalQuantity = res.reduce((acc, curr) => {
  //     return acc + curr.quantity;
  //   }, 0);

  //   setTotalSum({
  //     totalprice,
  //     totalWeight,
  //     totalQuantity,
  //   });
  // };

  // --------set to local storage products with updated counter
  const productsWithUpdatedCounter = () => {
    const res = [];
    for (const key in Object.keys(totalParams).length !== 0 && totalParams) {
      res.push({
        counter: totalParams[key].quantity,
        id: totalParams[key]._id,
        totalPrice: totalParams[key].totalPrice,
        totalWeight: totalParams[key].totalWeight,
      });
    }

    res.length && localStorage.setItem("goods", JSON.stringify(res));
  };

  useEffect(() => {
    findTotalSum();
  }, [totalParams]);

  // ------set total quantity to slice
  useEffect(() => {
    dispatch(setTotalQuantity(totalSum.totalQuantity));
    productsWithUpdatedCounter();
  }, [totalSum]);

  useEffect(() => {
    getProducts();
  }, [productsData]);

  useEffect(() => {
    setMiddleResize(width <= 980);
    setSmallResize(width <= 460);
  }, [width]);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);

  if (oneProductisloading) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <Preloader />
      </div>
    );
  }
  if (oneProductStatus) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="main-container">
        <h1>Your Shopping Cart</h1>
        <table className="cart__table table">
          {/* ------head */}
          <thead className="table__head">
            <tr>
              <th className="ps-0" colSpan={smallResize ? "3" : "2"}>
                Product
              </th>
              <th className="ps-0 table__title-price">Price </th>
              <th className="text-center table__quantity">Quantity</th>
              <th className="text-end pe-0 table__total">Total</th>
            </tr>
          </thead>
          {/* --------body */}
          <tbody>
            {products.map((elem) => {
              return (
                <View
                  element={elem}
                  key={elem._id}
                  middleResize={middleResize}
                  smallResize={smallResize}
                  setTotalParams={setTotalParams}
                  setProductsData={setProductsData}
                  getProducts={getProducts}
                  setTest={setTest}
                />
              );
            })}
          </tbody>
          {/*--------- footer */}
          <tfoot>
            {/* ------weight */}
            <tr>
              <td colSpan="5" className="ps-0 pe-0">
                <div className="d-flex justify-content-between w-100">
                  <span>Total weight</span>
                  <span>{`${totalSum.totalWeight} kg`}</span>
                </div>
              </td>
            </tr>

            {/* ------price */}
            <tr>
              <td colSpan="5" className="ps-0 pe-0">
                <div className="d-flex justify-content-between w-100">
                  <span> Total price</span>{" "}
                  <span>{`${totalSum.totalPrice} $`}</span>
                </div>
              </td>
            </tr>

            {/* -------textarea */}
            <tr>
              <td colSpan="5" className="table__note ps-0 pe-0">
                <div>
                  <p> Add a note to your order</p>
                  <textarea name="note-order"></textarea>
                </div>
              </td>
            </tr>

            {/* ------buttons */}
            <tr>
              <td colSpan="5" className="ps-0 pe-0">
                <div className="cart__button-container">
                  <Button
                    className="main-yellow cart__button"
                    label="continue shopping"
                    onclick={() => console.log("!!!")}
                  />
                  <Button
                    className="grey-stroke cart__button"
                    label="Proceed to checkout"
                    onclick={() => console.log("!!!")}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* ------scroll to top */}
      <CustomScrollToTop />
    </div>
  );
};

const View = memo(
  ({
    middleResize,
    smallResize,
    setTotalParams,
    setProductsData,
    element,
    getProducts,
    setTest,
  }) => {
    const { counter, name, picture, mainType, parameters, _id } = element;
    const { color, weight, price } = JSON.parse(parameters);
    const image = `http://localhost:3002/${picture[0]}`;

    const [quantity, setQuantity] = useState(counter);

    // ---------remove products
    const removeProduct = (id) => {
      const productsInCart = JSON.parse(localStorage.getItem("goods")) || [];
      const productsToCart = productsInCart.filter((elem) => elem.id !== id);
      // localStorage.setItem("goods", JSON.stringify(productsToCart));

      console.log();

      setTest(productsToCart);

      setProductsData(productsToCart);
      // getProducts();
    };

    let totalPrice = quantity * price;
    let totalWeight = quantity * weight;

    useEffect(() => {
      setTotalParams((totalParams) => ({
        ...totalParams,
        [name]: {
          totalPrice,
          totalWeight,
          quantity,
          name,
          _id,
        },
      }));
    }, [quantity]);

    return (
      <>
        {/* -----width 460px */}
        {smallResize && (
          <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0)" }}>
            {/* -----picture */}
            <td className="table__product-cell ps-0" colSpan="5">
              <div className="table__card-picture">
                <img src={image} alt="test" />
              </div>
            </td>
          </tr>
        )}

        <tr>
          {/* -----picture */}
          {/* -----main width */}
          {!smallResize && (
            <td className="table__product-cell ps-0">
              <div className="table__card-picture">
                <img src={image} alt="test" />
              </div>
            </td>
          )}

          {/* -------description */}
          <td
            className={smallResize ? "ps-0" : ""}
            colSpan={smallResize ? "3" : ""}
          >
            <div className="table__card-desc mb-3">
              <h3 className="table__card-title">{name}</h3>
              <div className="table__card-type">
                <span>Product type:</span>{" "}
                <span className="ms-2 table__data">{mainType}</span>
              </div>
              {/* <div className="table__card-type">{`Product type: ${mainType}`}</div> */}
              <div className="table__card-type">
                <span>Product color:</span>
                <span className="ms-2 table__data">{color}</span>
              </div>
              <div className="table__card-type">
                <span>Product Weight:</span>
                <span className="ms-2 table__data">{weight} kg</span>
              </div>
              {/* <div className="table__card-type">{`Product Weight: ${weight} kg`}</div> */}
            </div>
            <Button
              className="main-yellow table__button"
              label="remove"
              onclick={() => removeProduct(_id)}
            />
          </td>

          {/* ---------price */}
          <td
            className={`${
              middleResize ? "ps-3" : "ps-0"
            } table__price table__data`}
          >
            ${price}
          </td>
          {/* ------counter */}
          <td className="table__counter">
            <div className="d-flex flex-column align-items-center gap-2">
              <Counter valueCounter={quantity} setValueCounter={setQuantity} />
              {/* <Button
              className="main-yellow table__button"
              label="update"
              onclick={() => console.log("!!!")}
            /> */}
            </div>
          </td>
          {/* ------total */}
          <td className="text-end pe-0 table__total table__data">
            ${totalPrice}
          </td>
        </tr>

        {/*----------width 980px*/}
        {middleResize && (
          <tr className="table__resize">
            <td style={{ display: smallResize && "none" }}></td>
            {/* -----counter */}
            <td
              className={`text-start ${smallResize ? "ps-0" : ""} `}
              colSpan={smallResize ? "3" : ""}
            >
              <div className="d-flex flex-column align-items-start gap-2">
                <Counter
                  valueCounter={quantity}
                  setValueCounter={setQuantity}
                />
                {/* <Button
                className="main-yellow table__button"
                label="update"
                onclick={() => console.log("!!!")}
              /> */}
              </div>
            </td>
            {/* ----total */}
            <td className="text-end pe-0 table__data">${totalPrice}</td>
          </tr>
        )}
      </>
    );
  }
);

export default ShoppingCart;
