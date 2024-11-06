import "./shoppingCart.scss";

import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomScrollToTop from "../../../features/CustomScrollToTop";
import useResize from "../../../hooks/resize.hook";
import Counter from "../../counter/Counter";
import Button from "../../buttons/Buttons";
import { fetchAllGoods, fetchGoodsById } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Preloader from "../../preloader/Preloader";
import { setMessage, setProducts, setTotalQuantity } from "./shoppingCartSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  //-------- resize
  const [middleResize, setMiddleResize] = useState(window.innerWidth <= 980);
  const [smallResize, setSmallResize] = useState(window.innerWidth <= 460);
  let width = useResize()[0];

  const { oneProductisloading, oneProductStatus } = useSelector(
    (state) => state.galleryReducer
  );
  // -------elements to render
  const { products } = useSelector((state) => state.shoppingCartReducer);

  // -------elements  from local storage
  const [elementsFromLocal, setElementsFromLocal] = useState([]);

  // --------total parameters
  const [totalParams, setTotalParams] = useState(products);
  console.log(totalParams);

  // ------ getting from backend
  const getElements = () => {
    const promises = elementsFromLocal.map(({ id, counter }) => {
      return dispatch(fetchGoodsById(id)).then((data) => ({
        ...data.payload,
        counter,
      }));
    });
    Promise.all(promises).then((data) => {
      dispatch(setProducts(data));
    });
  };

  // -----delete elements
  const deleteElement = (id) => {
    const elements = JSON.parse(localStorage.getItem("goods"));
    const updatedElements = elements.filter((elem) => elem.id !== id);
    localStorage.setItem("goods", JSON.stringify(updatedElements));

    const res = JSON.parse(localStorage.getItem("goods"));
    setElementsFromLocal(res);
  };

  useEffect(() => {
    getElements();
  }, [elementsFromLocal]);

  // ----------get elements from local storage
  useEffect(() => {
    const elements = localStorage.getItem("goods");
    if (elements) {
      const parsedElements = JSON.parse(elements);
      setElementsFromLocal(parsedElements);
      getElements();
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
  }, []);

  // ----------resize
  useEffect(() => {
    setMiddleResize(width <= 980);
    setSmallResize(width <= 460);
  }, [width]);

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
        {products.length ? (
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
              {/* -----------View */}
              {products.map((product) => (
                <View
                  key={product._id}
                  middleResize={middleResize}
                  smallResize={smallResize}
                  product={product}
                  deleteElement={deleteElement}
                  setTotalParams={setTotalParams}
                />
              ))}
            </tbody>
            {/*--------- footer */}
            <tfoot>
              {/* ------weight */}
              <tr>
                <td colSpan="5" className="ps-0 pe-0">
                  <div className="d-flex justify-content-between w-100">
                    <span>Total weight</span>
                    <span>{`${"totalSum.totalWeight"} kg`}</span>
                  </div>
                </td>
              </tr>

              {/* ------price */}
              <tr>
                <td colSpan="5" className="ps-0 pe-0">
                  <div className="d-flex justify-content-between w-100">
                    <span> Total price</span>{" "}
                    <span>{`${"totalSum.totalPrice"} $`}</span>
                  </div>
                </td>
              </tr>

              {/* -------textarea */}
              <tr>
                <td colSpan="5" className="table__note ps-0 pe-0">
                  <div>
                    <p> Add a note to your order</p>
                    <textarea
                      name="note-order"
                      onChange={(e) => dispatch(setMessage(e.target.value))}
                    ></textarea>
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
        ) : null}
      </div>
      {/* ------scroll to top */}
      <CustomScrollToTop />
    </div>
  );
};

const View = memo(
  ({
    smallResize,
    middleResize,
    product,
    deleteElement,

    setTotalParams,
  }) => {
    const { counter, name, picture, mainType, parameters, _id } = product;
    const image = `http://localhost:3002/${picture[0]}`;
    const { color, weight, price } = JSON.parse(parameters);

    // --------quantity
    const [quantity, setQuantity] = useState(counter);
    let totalPrice = quantity * price;
    let totalWeight = quantity * weight;

    // ---------update data
    const updateProductsData = () => {
      const elements = JSON.parse(localStorage.getItem("goods"));
      const updated = elements.filter((elem) => elem.id !== _id);

      const updatedElements = [
        ...updated,
        { id: _id, counter: quantity, totalPrice, totalWeight, name },
      ];
      localStorage.setItem("goods", JSON.stringify(updatedElements));
    };

    useEffect(() => {
      if (quantity !== counter) {
        updateProductsData();
      }
    }, [quantity]);

    useEffect(() => {
      setTotalParams((totalParams) => {
        const res = totalParams.filter((elem) => elem.name !== name);
        // console.log(res);

        return [
          ...res,
          {
            totalPrice,
            totalWeight,
            quantity,
            name,
            _id,
          },
        ];
      });
    }, [quantity]);
    // useEffect(() => {
    //   setTotalParams((totalParams) => ({
    //     ...totalParams,
    //     [name]: {
    //       totalPrice,
    //       totalWeight,
    //       quantity,
    //       name,
    //       _id,
    //     },
    //   }));
    // }, [quantity]);

    return (
      <>
        {/* -----width 460px */}
        {smallResize && (
          <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0)" }}>
            {/* -----picture */}
            <td className="table__product-cell ps-0" colSpan="5">
              <div className="table__card-picture">
                <img src={image} alt="product" />
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
                <img src={image} alt="product" />
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
              onclick={() => deleteElement(_id)}
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
              onclick={() => updateProductsData()}
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

export default memo(ShoppingCart);

// !-------------------------------------------------------
// import "./shoppingCart.scss";
// import textPicture from "../../../resources/img/catalog/catalog-desc-handbag.jpg";

// import { memo, useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import CustomScrollToTop from "../../../features/CustomScrollToTop";
// import useResize from "../../../hooks/resize.hook";
// import Counter from "../../counter/Counter";
// import Button from "../../buttons/Buttons";
// import { fetchAllGoods, fetchGoodsById } from "../../gallery/gallerySlice";
// import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
// import pageUp from "../../../features/PageUp";
// import Preloader from "../../preloader/Preloader";
// import { setTotalQuantity } from "./shoppingCartSlice";

// const ShoppingCart = () => {
//   const dispatch = useDispatch();
//   const { oneProductisloading, oneProductStatus } = useSelector(
//     (state) => state.galleryReducer
//   );
//   //-------- resize
//   const [middleResize, setMiddleResize] = useState(window.innerWidth <= 980);
//   const [smallResize, setSmallResize] = useState(window.innerWidth <= 460);
//   let width = useResize()[0];

//   // -------elements  from local storage
//   const [elementsFromLocal, setElementsFromLocal] = useState([]);
//   // -------elements to render
//   const [products, setProducts] = useState([]);

//   // ------ get from backend
//   const getElements = () => {
//     const promises = elementsFromLocal.map(({ id, counter }) => {
//       return dispatch(fetchGoodsById(id)).then((data) => ({
//         ...data.payload,
//         counter,
//       }));
//     });
//     Promise.all(promises).then((data) => {
//       setProducts(data);
//     });
//   };

//   // console.log(products);

//   // ----------delete element
//   // const deleteElement = (id) => {
//   //   const elements = JSON.parse(localStorage.getItem("goods"));
//   //   const updatedElements = elements.filter((elem) => elem.id !== id);

//   //   // Обновляем локальное хранилище
//   //   localStorage.setItem("goods", JSON.stringify(updatedElements));

//   //   // Теперь обновляем состояние
//   //   setElementsFromLocal(updatedElements);

//   //   // Получаем продукты только после обновления состояния
//   //   getElements();
//   // };

//   // const deleteElement = (id) => {
//   //   const elements = JSON.parse(localStorage.getItem("goods"));
//   //   const updatedElements = elements.filter((elem) => elem.id !== id);
//   //   localStorage.setItem("goods", JSON.stringify(updatedElements));

//   //   // const res = JSON.parse(localStorage.getItem("goods"));
//   //   setElementsFromLocal(updatedElements);
//   //   getElements();
//   // };

//   const deleteElement = (id) => {
//     const elements = JSON.parse(localStorage.getItem("goods"));
//     const updatedElements = elements.filter((elem) => elem.id !== id);
//     localStorage.setItem("goods", JSON.stringify(updatedElements));

//     const res = JSON.parse(localStorage.getItem("goods"));
//     setElementsFromLocal(res);
//   };

//   // useEffect(() => {
//   //   if (elementsFromLocal.length) {
//   //     getElements();
//   //   }
//   // }, [elementsFromLocal]);

//   useEffect(() => {
//     getElements();
//   }, [elementsFromLocal]);

//   // ----------get elements from local storage
//   useEffect(() => {
//     const elements = localStorage.getItem("goods");
//     if (elements) {
//       const parsedElements = JSON.parse(elements);
//       setElementsFromLocal(parsedElements);
//       getElements(); // Получите продукты на основе начального локального хранилища
//     }
//   }, []);
//   // useEffect(() => {
//   //   const elements = localStorage.getItem("goods");
//   //   elements && setElementsFromLocal(JSON.parse(elements));
//   // }, []);

//   // ----------resize
//   useEffect(() => {
//     setMiddleResize(width <= 980);
//     setSmallResize(width <= 460);
//   }, [width]);

//   if (oneProductisloading) {
//     return (
//       <div style={{ paddingTop: "150px", height: "100vh" }}>
//         <Preloader />
//       </div>
//     );
//   }
//   if (oneProductStatus) {
//     return (
//       <div style={{ paddingTop: "150px", height: "100vh" }}>
//         <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
//       </div>
//     );
//   }

//   return (
//     <div className="cart">
//       <div className="main-container">
//         <h1>Your Shopping Cart</h1>
//         {products.length ? (
//           <table className="cart__table table">
//             {/* ------head */}
//             <thead className="table__head">
//               <tr>
//                 <th className="ps-0" colSpan={smallResize ? "3" : "2"}>
//                   Product
//                 </th>
//                 <th className="ps-0 table__title-price">Price </th>
//                 <th className="text-center table__quantity">Quantity</th>
//                 <th className="text-end pe-0 table__total">Total</th>
//               </tr>
//             </thead>
//             {/* --------body */}
//             <tbody>
//               {/* -----------View */}
//               {products.map((product) => (
//                 <View
//                   key={product._id}
//                   middleResize={middleResize}
//                   smallResize={smallResize}
//                   product={product}
//                   deleteElement={deleteElement}
//                 />
//               ))}
//             </tbody>
//             {/*--------- footer */}
//             <tfoot>
//               {/* ------weight */}
//               <tr>
//                 <td colSpan="5" className="ps-0 pe-0">
//                   <div className="d-flex justify-content-between w-100">
//                     <span>Total weight</span>
//                     <span>{`${"totalSum.totalWeight"} kg`}</span>
//                   </div>
//                 </td>
//               </tr>

//               {/* ------price */}
//               <tr>
//                 <td colSpan="5" className="ps-0 pe-0">
//                   <div className="d-flex justify-content-between w-100">
//                     <span> Total price</span>{" "}
//                     <span>{`${"totalSum.totalPrice"} $`}</span>
//                   </div>
//                 </td>
//               </tr>

//               {/* -------textarea */}
//               <tr>
//                 <td colSpan="5" className="table__note ps-0 pe-0">
//                   <div>
//                     <p> Add a note to your order</p>
//                     <textarea name="note-order"></textarea>
//                   </div>
//                 </td>
//               </tr>

//               {/* ------buttons */}
//               <tr>
//                 <td colSpan="5" className="ps-0 pe-0">
//                   <div className="cart__button-container">
//                     <Button
//                       className="main-yellow cart__button"
//                       label="continue shopping"
//                       onclick={() => console.log("!!!")}
//                     />
//                     <Button
//                       className="grey-stroke cart__button"
//                       label="Proceed to checkout"
//                       onclick={() => console.log("!!!")}
//                     />
//                   </div>
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         ) : null}
//       </div>
//       {/* ------scroll to top */}
//       <CustomScrollToTop />
//     </div>
//   );
// };

// const View = memo(({ smallResize, middleResize, product, deleteElement }) => {
//   const { counter, name, picture, mainType, parameters, _id } = product;

//   const { color, weight, price } = JSON.parse(parameters);
//   const image = `http://localhost:3002/${picture[0]}`;

//   // --------quantity
//   const [quantity, setQuantity] = useState(counter);

//   // const updateProductsData = () => {
//   //   const elements = JSON.parse(localStorage.getItem("goods"));

//   //   // Если элемент не был найден, возвращаем
//   //   const existingElement = elements.find((elem) => elem.id === _id);
//   //   if (!existingElement) return;

//   //   // Обновляем количество только для существующего элемента
//   //   const updatedElements = elements.map((elem) =>
//   //     elem.id === _id ? { ...elem, counter: quantity } : elem
//   //   );

//   //   localStorage.setItem("goods", JSON.stringify(updatedElements));
//   // };

//   const updateProductsData = () => {
//     const elements = JSON.parse(localStorage.getItem("goods"));
//     const updated = elements.filter((elem) => elem.id !== _id);

//     const res = [...updated, { id: _id, counter: quantity }];
//     localStorage.setItem("goods", JSON.stringify(res));
//   };

//   let totalPrice = quantity * price;
//   let totalWeight = quantity * weight;

//   // useEffect(() => {
//   //   updateProductsData();
//   // }, [quantity]);

//   console.log(quantity, counter);

//   useEffect(() => {
//     if (quantity !== counter) {
//       // Проверяем, изменилось ли количество
//       updateProductsData();
//     }

//     // updateProductsData();
//   }, [quantity]);

//   return (
//     <>
//       {/* -----width 460px */}
//       {smallResize && (
//         <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0)" }}>
//           {/* -----picture */}
//           <td className="table__product-cell ps-0" colSpan="5">
//             <div className="table__card-picture">
//               <img src={image} alt="product" />
//             </div>
//           </td>
//         </tr>
//       )}

//       <tr>
//         {/* -----picture */}
//         {/* -----main width */}
//         {!smallResize && (
//           <td className="table__product-cell ps-0">
//             <div className="table__card-picture">
//               <img src={image} alt="product" />
//             </div>
//           </td>
//         )}

//         {/* -------description */}
//         <td
//           className={smallResize ? "ps-0" : ""}
//           colSpan={smallResize ? "3" : ""}
//         >
//           <div className="table__card-desc mb-3">
//             <h3 className="table__card-title">{name}</h3>
//             <div className="table__card-type">
//               <span>Product type:</span>{" "}
//               <span className="ms-2 table__data">{mainType}</span>
//             </div>
//             <div className="table__card-type">
//               <span>Product color:</span>
//               <span className="ms-2 table__data">{color}</span>
//             </div>
//             <div className="table__card-type">
//               <span>Product Weight:</span>
//               <span className="ms-2 table__data">{weight} kg</span>
//             </div>
//             {/* <div className="table__card-type">{`Product Weight: ${weight} kg`}</div> */}
//           </div>
//           <Button
//             className="main-yellow table__button"
//             label="remove"
//             onclick={() => deleteElement(_id)}
//           />
//         </td>

//         {/* ---------price */}
//         <td
//           className={`${
//             middleResize ? "ps-3" : "ps-0"
//           } table__price table__data`}
//         >
//           ${price}
//         </td>
//         {/* ------counter */}
//         <td className="table__counter">
//           <div className="d-flex flex-column align-items-center gap-2">
//             <Counter valueCounter={quantity} setValueCounter={setQuantity} />
//             {/* <Button
//               className="main-yellow table__button"
//               label="update"
//               onclick={() => updateProductsData()}
//             /> */}
//           </div>
//         </td>
//         {/* ------total */}
//         <td className="text-end pe-0 table__total table__data">
//           ${totalPrice}
//         </td>
//       </tr>

//       {/*----------width 980px*/}
//       {middleResize && (
//         <tr className="table__resize">
//           <td style={{ display: smallResize && "none" }}></td>
//           {/* -----counter */}
//           <td
//             className={`text-start ${smallResize ? "ps-0" : ""} `}
//             colSpan={smallResize ? "3" : ""}
//           >
//             <div className="d-flex flex-column align-items-start gap-2">
//               <Counter valueCounter={quantity} setValueCounter={setQuantity} />
//               {/* <Button
//                 className="main-yellow table__button"
//                 label="update"
//                 onclick={() => console.log("!!!")}
//               /> */}
//             </div>
//           </td>
//           {/* ----total */}
//           <td className="text-end pe-0 table__data">${totalPrice}</td>
//         </tr>
//       )}
//     </>
//   );
// });

// export default memo(ShoppingCart);
