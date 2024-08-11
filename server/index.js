import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import GoodsSchema from "./models/goods.js";
import router from "./routs/goodsRout.js";

const app = express();
dotenv.config();

// Constatns
const PORT = process.env.PORT || 3003;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", router);

// Endpoints
// app.get("/api/goods", async (req, res) => {
//   try {
//     const allGoods = await GoodsSchema.find();
//     return res.json(allGoods);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bag-bd.bvf0a.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=bag-bd`
    ),
      app.listen(PORT, () => console.log(`Server started port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
