import OrderSchema from "../models/order.js";

class OrderService {
  // create
  async orderCreate(order) {
    const createdOrder = await OrderSchema.create(order);
    return createdOrder;
  }

  // get
  async orderGetAll() {
    const orders = await OrderSchema.find();
    return orders;
  }

  // delete
  async deleteOrder(id) {
    if (!id) {
      throw new Error("Such order does not exist");
    }
    const deletedOrder = await OrderSchema.findByIdAndDelete(id);
    return deletedOrder;
  }
}
export default new OrderService();
