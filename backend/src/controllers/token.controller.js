import { refreshTokenService } from "../services/token.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const newToken = await refreshTokenService(refreshToken);
  return res
    .status(200)
    .json(new ApiResponse(200, "Access token created successfully", newToken));
});

export { refreshToken };
