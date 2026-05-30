import asyncHandler from "../utils/asyncHandler.js";
import {
  getProfileService,
  updateProfileService,
  getAllUsersService,
  changePasswordService,
} from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await getProfileService(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, "User details fetched successfully", user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await updateProfileService(userId, {
    username: req.body.username,
    fullname: req.body.fullname,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User details updated successfully", user));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();
  return res
    .status(200)
    .json(new ApiResponse(200, "All User details fetched successfully", users));
});

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { currentPassword, newPassword } = req.body;

  await changePasswordService(userId, currentPassword, newPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

export { getProfile, updateProfile, getAllUsers, changePassword };
