import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getProfile);

userRouter.patch("/me", authMiddleware, updateProfile);

userRouter.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

export default userRouter;
