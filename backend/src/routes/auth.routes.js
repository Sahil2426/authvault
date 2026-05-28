import express from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/auth.validation.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), register);

authRouter.get("/verify-email/:token", verifyEmail);

authRouter.post("/login", validate(loginSchema), login);

authRouter.post("/logout", logout);

authRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword,
);

authRouter.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

export default authRouter;
