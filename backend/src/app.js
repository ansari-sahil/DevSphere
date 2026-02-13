import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import hpp from "hpp";
import compression from "compression";
import timeout from "connect-timeout";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(timeout("15s"));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(hpp());
app.use(compression());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

/* ✅ HEALTH CHECK (Render needs this) */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

/* Root */
app.get("/", (req, res) => {
  res.json({ message: "DevSphere API Running" });
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

/* Error handler */
app.use(errorHandler);

export default app;
