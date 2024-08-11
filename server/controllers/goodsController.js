import GoodsSchema from "../models/goods.js";
import GoodsService from "../services/goodsService.js";

// post
export const postGoods = async (req, res) => {
  try {
    const goods = await GoodsService.postGoods(req.body);
    res.status(200).json(goods);
  } catch (error) {
    res.status(500).json(error);
  }
};
// export const postGoods = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const goods = await GoodsSchema.create({
//       name,
//       description: "Desc goods",
//       picture: "Picture goods",
//     });
//     res.status(200).json(goods);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

//get
export const getAllGoods = async (req, res) => {
  try {
    const allGoods = await GoodsService.getAllGoods();
    return res.json(allGoods);
  } catch (error) {
    res.status(500).json(error);
  }
};
// export const getAllGoods = async (req, res) => {
//   try {
//     const allGoods = await GoodsSchema.find();
//     return res.json(allGoods);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

//get to id
export const getGoodsId = async (req, res) => {
  try {
    const { id } = req.params;
    const goodsId = await GoodsService.getGoodsId(id);
    return res.json(goodsId);
  } catch (error) {
    res.status(500).json(error);
  }
};
// export const getGoodsId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       res.status(400).json({ message: "Id not found" });
//     }
//     const goodsId = await GoodsSchema.findById(id);
//     return res.json(goodsId);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// put
export const putGoods = async (req, res) => {
  try {
    const element = req.body;

    const updatedGoods = await GoodsService.putGoods(element);
    return res.json(updatedGoods);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const putGoods = async (req, res) => {
//   try {
//     const element = req.body;
//     if (!element._id) {
//       res.status(400).json({ message: "Id not found" });
//     }

//     const updatedGoods = await GoodsSchema.findByIdAndUpdate(
//       element._id,
//       element,
//       { new: true }
//     );
//     return res.json(updatedGoods);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// delete
export const deleteGoods = async (req, res) => {
  try {
    const { id } = req.params;
    const element = await GoodsService.deleteGoods(id);
    return res.json(element);
  } catch (error) {
    res.status(500).json(error);
  }
};
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
