import express from "express";
import {admin, protect} from '../middleware/authMiddleware.js'

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);
router.route("/:id").get(protect, admin,getUserById).delete(protect, admin,deleteUser).put(protect, admin,updateUser);

export default router;
