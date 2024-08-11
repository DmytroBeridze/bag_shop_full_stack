import { Router } from "express";
const router = new Router();
import {
  deleteGoods,
  getAllGoods,
  getGoodsId,
  postGoods,
  putGoods,
} from "../controllers/goodsController.js";

router.post("/goods", postGoods);
router.get("/goods", getAllGoods);
router.get("/goods/:id", getGoodsId);
router.put("/goods/", putGoods);
router.delete("/goods/:id", deleteGoods);

export default router;
