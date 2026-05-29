import ApiError from "../utils/ApiError.js";

const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      throw new ApiError(403, "Forbidden");
    }
    next();
  };
};

export default roleMiddleware;
