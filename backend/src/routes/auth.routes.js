import express from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { logoutUser } from "../services/auth.service.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), register);

authRouter.get("/verify-email/:token", verifyEmail);

authRouter.post("/login", validate(loginSchema), login);

authRouter.post("/logout", logout);

export default authRouter;
