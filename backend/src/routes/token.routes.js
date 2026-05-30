import express from "express";
import { refreshToken } from "../controllers/token.controller.js";

const tokenRouter = express.Router();

tokenRouter.post("/refresh", refreshToken);

export default tokenRouter;
