import GoodsSchema from "../models/goods.js";

class GoodsService {
  // post
  async postGoods(goods) {
    const createdGoods = await GoodsSchema.create(goods);
    return createdGoods;
  }

  //get
  async getAllGoods() {
    const allGoods = await GoodsSchema.find();
    return allGoods;
  }

  //get to id
  async getGoodsId(id) {
    if (!id) {
      throw new Error("ID not found");
    }
    const goodsId = await GoodsSchema.findById(id);
    return goodsId;
  }

  // put
  async putGoods(element) {
    if (!element._id) {
      throw new Error("ID not found");
    }
    const updatedGoods = await GoodsSchema.findByIdAndUpdate(
      element._id,
      element,
      {
        new: true,
      }
    );
    return updatedGoods;
  }

  // delete
  async deleteGoods(id) {
    if (!id) {
      throw new Error("ID not found");
    }
    const element = await GoodsSchema.findByIdAndDelete(id);
    return element;
  }
  // export const deleteGoods = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     if (!id) {
  //       res.status(400).json({ message: "Id not found" });
  //     }
  //     const element = await GoodsSchema.findByIdAndDelete(id);
  //     return res.json(element);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // };
}

export default new GoodsService();
