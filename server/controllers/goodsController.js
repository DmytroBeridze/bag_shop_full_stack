import GoodsSchema from "../models/goods.js";
import AdminSchema from "../models/admin.js";
import GoodsService from "../services/goodsService.js";
import AdminService from "../services/adminService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fileService from "../fileService/fileService.js";

// post
export const postGoods = async (req, res) => {
  //  const user = await AdminSchema.findById(req.userId);
  try {
    const goods = await GoodsService.postGoods(req.body, req.files?.picture);

    res.status(200).json({ message: "Goods created", goods });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// export const postGoods = async (req, res) => {
//   try {
//     const { name, description, mainType, type } = req.body;
//     const isUsed = await GoodsSchema.findOne({ name });
//     if (isUsed) {
//       return res.json({ message: "This name already exists" });
//     }

//     const fileName = fileService.saveFile(req.files?.picture);

//     const goods = await GoodsSchema.create({
//       ...req.body,
//       picture: fileName,
//     });

//     res.status(200).json({ message: "Goods created", goods });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

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
    res.status(500).json(error.massage);
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
    res.status(500).json(error.massage);
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
    res.status(500).json(error.message);
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
    const { picture } = req.body;
    // await GoodsService.deleteGoods(id);
    const element = await GoodsService.deleteGoods(id, picture);
    return res.json({
      goods: element,
      message: `Goods id: ${id} deleted`,
    });
  } catch (error) {
    // res.status(500).json(error.massage);
    res.json(error.massage);
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

// ADMIN
// register
export const adminRegister = async (req, res) => {
  try {
    const { name, password } = req.body;

    // AdminService.adminRegister(name, password);
    const user = await AdminService.adminRegister(name, password);
    return res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// export const adminRegister = async (req, res) => {
//   try {
//     const { name, password } = req.body;

//     const isUsed = await AdminSchema.findOne({ name });

//     if (isUsed) {
//       return res.json({ message: "Username is taken" });
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const newUser = new AdminSchema({
//       name,
//       password: hash,
//     });

//     await newUser.save();
//     res.json({
//       newUser,
//       message: "Registration successful",
//     });
//   } catch (error) {
//     res.status(500).json("Error Registration");
//   }
// };

//! ----------------------
// login
// export const adminLogin = async (req, res) => {
//   try {
//     const { name, password } = req.body;

//     const data = await AdminService.adminLogin(name, password);

//     if (!data.user) {
//       return res.json({ message: "User does non exist" });
//     }

//     if (!data.isPasswordCorrect) {
//       return res.json({
//         message: "Wrong password",
//       });
//     }

//     res.json({
//       ...data,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error login" });
//   }
// };
//! ----------------------
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
      // {expiresIn:"30d"}
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

// get me
// export const getMe = async (req, res) => {
//   try {
//     const user = await AdminSchema.findById(req.userId);
//     // const user = await AdminService.findById(req.userId);

//     res.json({
//       user: "test",
//     });
//   } catch (error) {
//     res.status(500).json("No access");
//   }
// };

export const getMe = async (req, res) => {
  try {
    const user = await AdminSchema.findById(req.userId);
    // const user = await AdminService.findById(req.userId);
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
      // {expiresIn:"30d"}
    );
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json("No access");
  }
};
