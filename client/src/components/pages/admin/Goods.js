import React from "react";
import DisplayGoods from "../../adminPanel/displayGoods/DisplayGoods";
import AddGoodsForm from "../../adminPanel/addGoodsForm/AddGoodsForm";

const Goods = ({ imageModal, getTargetId }) => {
  return (
    <section className="admin">
      <div className="admin__goods-container">
        <DisplayGoods imageModal={imageModal} getTargetId={getTargetId} />
        <AddGoodsForm />
      </div>
    </section>
  );
};

export default Goods;
