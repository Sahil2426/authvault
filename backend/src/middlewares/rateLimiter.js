import rateLimit from "express-rate-limit";

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many attempts, please try again after 1 hour",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many attempts, please try again after 15 minutes",
  },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many attempts, please try again after 1 hour",
  },
});

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many attempts, please try again after 15 minutes",
  },
});

const verifyEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many attempts, please try again after 1 hour",
  },
});

const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many attempts, please try again after 15 minutes",
  },
});

export {
  registerLimiter,
  loginLimiter,
  forgotPasswordLimiter,
  verifyEmailLimiter,
  refreshTokenLimiter,
  resetPasswordLimiter,
};
