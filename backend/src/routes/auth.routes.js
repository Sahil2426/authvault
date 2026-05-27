import express from "express";
import { register, verifyEmail } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validations/auth.validation.js";

const authRouter = express.Router();

authRouter.get("/verify-email/:token", verifyEmail);

authRouter.post("/register", validate(registerSchema), register);

export default authRouter;
