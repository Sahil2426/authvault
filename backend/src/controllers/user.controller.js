import asyncHandler from "../utils/asyncHandler.js";
import {
  getProfileService,
  updateProfileService,
  getAllUsersService,
} from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await getProfileService(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, "User details fetched successfuly", user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await updateProfileService(userId, {
    username: req.body.username,
    fullname: req.body.fullname,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User details updated successfuly", user));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await getAllUsersService();
  return res
    .status(200)
    .json(new ApiResponse(200, "All User details fetched successfuly", user));
});

export { getProfile, updateProfile, getAllUsers };
