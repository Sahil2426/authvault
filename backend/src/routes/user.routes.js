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

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/me", authMiddleware, getProfile);

/**
 * @swagger
 * /api/v1/users/me:
 *   patch:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: newusername
 *               fullname:
 *                 type: string
 *                 example: New Name
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfile,
);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
userRouter.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

/**
 * @swagger
 * /api/v1/users/change-password:
 *   patch:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: Test@1234
 *               newPassword:
 *                 type: string
 *                 example: NewPass@1234
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Current password is incorrect
 */
userRouter.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassword,
);

export default userRouter;
