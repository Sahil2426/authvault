import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";

import app from "./src/app.js";

async function startServer() {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
}

startServer();
