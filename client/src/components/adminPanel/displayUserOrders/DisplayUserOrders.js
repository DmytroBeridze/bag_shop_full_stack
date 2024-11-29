import "./displayUserOrders.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

import { deleteOrder, getAllOrders } from "./DisplayUserOrdersSlice";

const DisplayUserOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, orderStatus } = useSelector(
    (state) => state.userOrderReducer
  );

  const deleteElement = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, orderStatus]);

  // useEffect(() => {
  //   dispatch(getAllOrders());
  // }, []);

  return (
    <div>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((elem) => {
          const { order } = elem;
          const parsedOrder = JSON.parse(order);
          const allGoodsTotalPrice = parsedOrder.reduce((acc, cur) => {
            return (acc += cur.totalPrice);
          }, 0);

          return (
            <div className="display-orders" key={elem._id}>
              <div className="display-orders__contacts">
                <div className="display-orders__header">
                  <h3>
                    User <span>{elem.name}</span> sent his contact:
                  </h3>
                  <div
                    onClick={() => {
                      deleteElement(elem._id);
                    }}
                  >
                    <FiTrash2 size={"23px"} />
                  </div>
                </div>
                <ul className="mb-3">
                  <li>Name: {elem.name ? elem.name : "no name"}</li>
                  <li>
                    Last name: {elem.lastName ? elem.lastName : "no last name"}
                  </li>
                  <li>Email: {elem.email ? elem.email : "no email"}</li>
                  <li>Phone: {elem.phone ? elem.phone : "no phone"}</li>
                  <li>Country: {elem.country ? elem.country : "no country"}</li>
                  <li>ZIP: {elem.zip ? elem.zip : "no zip"}</li>
                  <li>City: {elem.city ? elem.city : "no city"}</li>
                  <li>
                    Apartment:{" "}
                    {elem.apartment ? elem.apartment : "no apartment"}
                  </li>
                  <li>
                    Message:{" "}
                    {elem.message !== "null" ? elem.message : "no message"}
                  </li>
                </ul>
              </div>

              {/*---------- order */}
              <div className="display-orders__orders">
                <h3> make an order:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>type</th>
                      <th>counter</th>
                      <th>price</th>
                      <th>total price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View parsedOrder={parsedOrder} />
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={4}>total price</th>
                      <td>{allGoodsTotalPrice}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div className="">
          <h4 className="text-center text-warning">No elements...</h4>
        </div>
      )}
    </div>
  );
};

const View = ({ parsedOrder }) => {
  return (
    <>
      {parsedOrder.map((order) => {
        const { name, mainType, counter, price, totalPrice } = order;
        return (
          <tr key={name}>
            <td>{name}</td>
            <td>{mainType}</td>
            <td>{counter}</td>
            <td>{price}</td>
            <td>{totalPrice}</td>
          </tr>
        );
      })}
    </>
  );
};

export default DisplayUserOrders;
