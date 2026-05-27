import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ApiError from "../utils/apiError.js";
import { sendVerificationEmail } from "./email.service.js";

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

export { verifyEmailService, registerUser };
