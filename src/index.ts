import express, { Request, Response } from "express";
import path from "path";

import {
  userRoutes,
  authRoutes,
  favoriteRoutes,
  productRoutes,
  shopRoutes,
  searchRoutes,
  tagRoutes,
} from "./routes";
import cors, { CorsOptions } from "cors";
import { adminProductRoutes } from "./routes/admin";

const app = express();
const PORT = process.env.PORT || 8800;
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_PRODUCTION_URL,
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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

//routes
// app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/tags", tagRoutes);

app.use("/api/auth", authRoutes);

const checkDbConnection = async (req: Request, res: Response) => {
  if (!process.env.JAWSDB_URL) {
    res.status(500).json({
      status: "error",
      message: "JAWSDB_URL environment variable is not set.",
    });
    return;
  }

  // Attempt to connect or ping the existing connection
  // The exact method depends on your database library.
  // Using a simplified example, assuming 'connection' object exists from your setup
  try {
    // If you have a global connection pool or object named 'pool'
    // You might try pool.getConnection() or pool.query('SELECT 1 + 1 AS solution');
    // If using 'mysql2' with promises or async/await:
    const mysql = require("mysql2/promise"); // Or your chosen library
    const testConnection = await mysql.createConnection(process.env.JAWSDB_URL);
    await testConnection.ping(); // Ping the connection to test it
    await testConnection.end(); // Close the test connection
    res
      .status(200)
      .json({ status: "success", message: "Database connection successful!" });
  } catch (error: any) {
    console.error("Database connection check failed:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed.",
      details: error.message,
    });
  }
};
app.get("/api/db", checkDbConnection);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("🚀 Moons Footwear API is running.");
});
