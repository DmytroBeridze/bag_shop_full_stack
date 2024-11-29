import AdminSchema from "../models/admin.js";
import GoodsService from "../services/goodsService.js";
import AdminService from "../services/adminService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// post
export const postGoods = async (req, res) => {
  try {
    const goods = await GoodsService.postGoods(req.body, req.files?.picture);

    res.status(200).json({ message: "Goods created", goods });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get
export const getAllGoods = async (req, res) => {
  try {
    // throw new Error("Test error");
    const allGoods = await GoodsService.getAllGoods();
    return res.json(allGoods);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get to id
export const getGoodsId = async (req, res) => {
  try {
    const { id } = req.params;
    const goodsId = await GoodsService.getGoodsId(id);
    return res.json(goodsId);
  } catch (error) {
    res.status(500).json(error.massage);
  }
};

// put
export const putGoods = async (req, res) => {
  try {
    const updatedGoods = await GoodsService.putGoods(
      req.body,
      req.files?.newPicture
    );
    res.status(200).json({ message: "Goods edited", updatedGoods });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete
export const deleteGoods = async (req, res) => {
  try {
    const { id } = req.params;
    const { picture } = req.body;
    const element = await GoodsService.deleteGoods(id, picture);
    return res.json({
      goods: element,
      message: `Goods id: ${id} deleted`,
    });
  } catch (error) {
    res.json(error.massage);
  }
};

// ADMIN
// register
export const adminRegister = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await AdminService.adminRegister(name, password);
    return res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await AdminSchema.findOne({ name });

    if (!user) {
      return res.json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user,
      message: "You are logged in",
    });
  } catch (error) {
    res.status(500).json({ message: "Error login" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await AdminSchema.findById(req.userId);
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json("No access");
  }
};
