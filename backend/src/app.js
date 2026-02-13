import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "DevSphere API Running" });
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
