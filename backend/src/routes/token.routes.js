import express from "express";
import { refreshToken } from "../controllers/token.controller.js";
import { refreshTokenLimiter } from "../middlewares/rateLimiter.js";

const tokenRouter = express.Router();

/**
 * @swagger
 * /api/v1/token/refresh:
 *   post:
 *     summary: Get new access token using refresh token
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your_refresh_token_here
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid or expired refresh token
 */
tokenRouter.post("/refresh", refreshTokenLimiter, refreshToken);

export default tokenRouter;
