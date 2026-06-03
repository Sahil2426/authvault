import jwt from "jsonwebtoken";

import TokenModel from "../models/Token.model.js";
import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";

const accessTokenService = async (refreshToken) => {
  const token = await TokenModel.findOne({ token: refreshToken });

  if (!token) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (Date.now() > new Date(token.expiresAt).getTime()) {
    await TokenModel.findByIdAndDelete(token._id);

    throw new ApiError(401, "Refresh token has expired");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );

  return { accessToken };
};

export { accessTokenService };
