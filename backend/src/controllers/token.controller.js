import { accessTokenService } from "../services/token.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const newToken = await accessTokenService(refreshToken);
  return res
    .status(200)
    .json(new ApiResponse(200, "Access token created successfully", newToken));
});

export { refreshAccessToken };
