import OrderService from "../services/orderService.js";
import sendMail from "../utils/sandGreed.js";

// create
export const createOrder = async (req, res) => {
  try {
    const order = await OrderService.orderCreate(req.body);

    sendMail(order, "order");
    res.status(200).json({ message: "Order created", order });
  } catch (error) {
    console.log(error);
    res.status(500);
    //   .json({ message: error.message || "Error fetching orders." });
    res.status(500).json({ message: "Sending error." });
  }
};

// get
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.orderGetAll(req, res);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error.massage);

    // res.json({ message: error.message });
  }
};

// delete
export const orderDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderService.deleteOrder(id);
    console.log(deletedOrder);
    res.status(200).json({ message: `Order ${id} deleted`, deletedOrder });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
