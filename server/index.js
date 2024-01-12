// Importing necessary modules using ES6 syntax
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

// Importing routers
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

import "dotenv/config";
const env = process.env;

// Initializing the express application
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// API routes
app.use("/users", userRouter);
app.use("/tour", tourRouter);

// MongoDB URL and server port
const MONGODB_URL = env.DB_URL;
const port = env.PORT;

// Connecting to MongoDB and starting the server
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
