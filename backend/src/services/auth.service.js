import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const registerUser = async (username, fullname, email, password) => {
  if (await UserModel.findOne({ $or: [{ email }, { username }] })) {
    throw new Error("User already exists with email or username");
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

  const userObject = newUser.toObject();

  delete userObject.password;

  return userObject;
};

export { registerUser };
