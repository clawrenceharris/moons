import express, { Request, Response } from "express";
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

const app = express();

const PORT = process.env.PORT || 8800;
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_PRODUCTION_URL,
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.filter(Boolean).includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: false,
  allowedHeaders: "Content-Type, Authorization, Cookie",
};
app.use(express.json());
app.use(cors(corsOptions));
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
