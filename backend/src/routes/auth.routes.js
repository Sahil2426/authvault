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
import {
  loginLimiter,
  registerLimiter,
  verifyEmailLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
} from "../middlewares/rateLimiter.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerLimiter,
  validate(registerSchema),
  register,
);

authRouter.get("/verify-email/:token", verifyEmailLimiter, verifyEmail);

authRouter.post("/login", loginLimiter, validate(loginSchema), login);

authRouter.post("/logout", logout);

authRouter.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validate(forgotPasswordSchema),
  forgotPassword,
);

authRouter.post(
  "/reset-password/:token",
  resetPasswordLimiter,
  validate(resetPasswordSchema),
  resetPassword,
);

export default authRouter;
