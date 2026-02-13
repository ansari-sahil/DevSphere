import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

// Logging
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "DevSphere API Running" });
});

// Error Middleware
app.use(errorHandler);

export default app;
