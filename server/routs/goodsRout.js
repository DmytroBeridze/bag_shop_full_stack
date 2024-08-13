import { Router } from "express";
const router = new Router();
import {
  deleteGoods,
  getAllGoods,
  getGoodsId,
  postGoods,
  putGoods,
  adminRegister,
  adminLogin,
  getMe,
} from "../controllers/goodsController.js";
import { checkAuth } from "../utils/checkAuth.js";

router.post("/goods", postGoods);
router.get("/goods", getAllGoods);
router.get("/goods/:id", getGoodsId);
router.put("/goods/", putGoods);
router.delete("/goods/:id", deleteGoods);

// register
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/me", checkAuth, getMe);

export default router;
