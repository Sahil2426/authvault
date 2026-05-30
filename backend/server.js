import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";

import app from "./src/app.js";

async function startServer() {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
