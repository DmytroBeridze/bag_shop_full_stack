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

import {
  getAllContacts,
  postContacts,
  deleteContact,
} from "../controllers/contactsController.js";
import {
  createOrder,
  getAllOrders,
  orderDelete,
} from "../controllers/orderController.js";

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

// contacts
router.post("/userContact", postContacts);
router.get("/userContact", getAllContacts);
router.delete("/userContact/:id", deleteContact);

// orders
router.post("/userOrder", createOrder);
router.get("/userOrder", getAllOrders);
router.delete("/userOrder/:id", orderDelete);

export default router;
