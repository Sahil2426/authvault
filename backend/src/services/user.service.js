import UserModel from "../models/User.model.js";
import ApiError from "../utils/apiError.js";

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
    { new: true },
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
  if (!users) {
    throw new ApiError(404, "No users found");
  }

  return users.map((users) => {
    const userObject = users.toObject();
    delete userObject.password;
    return userObject;
  });
};

export { getProfileService, updateProfileService, getAllUsersService };
