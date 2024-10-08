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
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostsId,
} from "../controllers/postController.js";

import { checkAuth } from "../utils/checkAuth.js";

// register
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/me", checkAuth, getMe);

// goods
router.post("/goods", postGoods);
router.get("/goods", getAllGoods);
router.get("/goods/:id", getGoodsId);
router.put("/goods/:id", putGoods);
router.delete("/goods/:id", deleteGoods);

// posts
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostsId);
router.put("/posts/:id", editPost);
router.delete("/posts/:id", deletePost);

export default router;
