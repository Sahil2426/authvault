import { registerUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

const register = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  const user = await registerUser(username, fullname, email, password);
  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export { register };
