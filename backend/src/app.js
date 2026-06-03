import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import tokenRouter from "./routes/token.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/token", tokenRouter);

app.use(errorMiddleware);

export default app;
