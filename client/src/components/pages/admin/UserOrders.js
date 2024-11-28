import DisplayUserOrders from "../../adminPanel/displayUserOrders/DisplayUserOrders";

const UserOrders = () => {
  return (
    <section className="admin ">
      <div className="admin__users-orders ">
        <h2 className="mb-3">User orders</h2>
        <DisplayUserOrders />
      </div>
    </section>
  );
};

export default UserOrders;
