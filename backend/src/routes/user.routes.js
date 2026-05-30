import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  changePassword,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validations/user.validation.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getProfile);

userRouter.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfile,
);

userRouter.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

userRouter.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassword,
);

export default userRouter;
