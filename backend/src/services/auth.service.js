import UserModel from "../models/User.model.js";
import TokenModel from "../models/Token.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ApiError from "../utils/apiError.js";
import { sendVerificationEmail } from "./email.service.js";
import jwt from "jsonwebtoken";

const registerUser = async (username, fullname, email, password) => {
  if (await UserModel.findOne({ $or: [{ email }, { username }] })) {
    throw new ApiError(409, "User already exists with email or username");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  const emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;

  const newUser = await UserModel.create({
    username,
    fullname,
    email,
    password: hashedPassword,
    emailVerificationToken,
    emailVerificationExpiry,
  });

  await sendVerificationEmail(newUser.email, newUser.emailVerificationToken);

  const userObject = newUser.toObject();

  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpiry;

  return userObject;
};

const verifyEmailService = async (token) => {
  const user = await UserModel.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new ApiError(400, "Invalid verification token");
  }

  if (Date.now() > user.emailVerificationExpiry) {
    throw new ApiError(400, "Verification token has expired");
  }

  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;

  await user.save();

  return {
    message: "Email verification successful",
  };
};

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found!");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email first");
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw new ApiError(401, "Invalid login credentials");
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  await TokenModel.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpiry;

  return {
    accessToken,
    refreshToken,
    user: userObject,
  };
};

const logoutUser = async (refreshToken) => {
  const result = await TokenModel.findOneAndDelete({
    token: refreshToken,
  });

  if (!result) {
    throw new ApiError(401, "Invalid refresh token");
  }

  return {
    message: "Logout user successful",
  };
};

export { verifyEmailService, registerUser, loginUser, logoutUser };
