import express, { NextFunction, Request, Response } from "express";
import path from "path";

import {
  productRoutes,
  shopRoutes,
  searchRoutes,
  tagRoutes,
  authRoutes,
} from "./routes";
import cors, { CorsOptions } from "cors";
import { adminProductRoutes } from "./routes/admin";
import { initializeDatabase } from "./db";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8800;
const CLIENT_PRODUCTION_URL = process.env.CLIENT_PRODUCTION_URL;

const allowedOrigins = [
  "http://localhost:3000",
  ...(CLIENT_PRODUCTION_URL ? [CLIENT_PRODUCTION_URL] : []),
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, Cookie",
};
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors(corsOptions));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const startServer = async () => {
  try {
    await initializeDatabase();
    //routes
    app.use("/api/shop", shopRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/search", searchRoutes);
    app.use("/api/admin/product", adminProductRoutes);
    app.use("/api/tags", tagRoutes);
    app.use("/api/auth", authRoutes);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    app.get("/", (req, res) => {
      res.send("Moons Footwear API is running.");
    });
  } catch (error) {
    console.error(
      "FATAL ERROR: Failed to start server due to database initialization error:",
      error
    );
    process.exit(1);
  }
};

startServer();
