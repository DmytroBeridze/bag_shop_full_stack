import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routs/goodsRout.js";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3003;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));

// routes
app.use("/api", router);
app.use("/api/auth", router);
app.use("/api/blog", router);
app.use("/api/contacts", router);
app.use("/api/orders", router);

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
