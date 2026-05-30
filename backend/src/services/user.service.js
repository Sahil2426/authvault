import UserModel from "../models/User.model.js";
import TokenModel from "../models/Token.model.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";

const getProfileService = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

const updateProfileService = async (userId, data) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: data },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  const userObject = updatedUser.toObject();
  delete userObject.password;

  return userObject;
};

const getAllUsersService = async () => {
  const users = await UserModel.find();
  if (users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return users.map((users) => {
    const userObject = users.toObject();
    delete userObject.password;
    return userObject;
  });
};

const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const result = await bcrypt.compare(currentPassword, user.password);
  if (!result) {
    throw new ApiError(401, "Current password is incorrect");
  }

  if (currentPassword === newPassword) {
    throw new ApiError(
      400,
      "New password must be different from current password",
    );
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = newHashedPassword;
  await user.save();

  // logout from all devices
  await TokenModel.deleteMany({
    userId: user._id,
  });

  return {
    message: "Password updated successfully",
  };
};

export {
  getProfileService,
  updateProfileService,
  getAllUsersService,
  changePasswordService,
};
