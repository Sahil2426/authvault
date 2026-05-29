import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = result;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default authMiddleware;
