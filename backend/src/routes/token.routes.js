import express from "express";
import { refreshToken } from "../controllers/token.controller.js";
import { refreshTokenLimiter } from "../middlewares/rateLimiter.js";

const tokenRouter = express.Router();

tokenRouter.post("/refresh", refreshTokenLimiter, refreshToken);

export default tokenRouter;
