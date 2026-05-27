import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "username must be atleast 3 characters")
    .max(20, "username should not be longer than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores",
    ),

  password: z
    .string()
    .min(8, "password must be atleast 8 characters")
    .max(50, "password should not be longer than 50 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number and one special character",
    ),

  fullname: z
    .string()
    .min(2, "fullname must be atleast 2 characters")
    .max(50, "fullname should not be longer than 50 characters"),

  email: z.string().email("Invalid email format"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "password must be atleast 8 characters")
    .max(50, "password should not be longer than 50 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number and one special character",
    ),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "password must be atleast 8 characters")
    .max(50, "password should not be longer than 50 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number and one special character",
    ),
});

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
