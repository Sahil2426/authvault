import {
  registerUser,
  verifyEmailService,
  loginUser,
  logoutUser,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

const register = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  const user = await registerUser(username, fullname, email, password);
  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.params.token;
  await verifyEmailService(token);
  return res
    .status(200)
    .json(new ApiResponse(200, "Email verified successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  return res.status(200).json(new ApiResponse(200, "Login successful", result));
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  await logoutUser(refreshToken);
  return res.status(200).json(new ApiResponse(200, "Logout successful"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const result = await forgotPasswordService(email);
  return res.status(200).json(new ApiResponse(200, result.message));
});

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;
  await resetPasswordService(token, newPassword);
  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});

export { register, verifyEmail, login, logout, forgotPassword, resetPassword };
