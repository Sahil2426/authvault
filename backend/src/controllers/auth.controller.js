import { registerUser, verifyEmailService } from "../services/auth.service.js";
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

export { register, verifyEmail };
