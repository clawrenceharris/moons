import express from "express";
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
const PORT = 8800;
// middlewares
app.use(express.json());
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_PRODUCTION_URL
    : "http://localhost:3000";

const corsOptions: CorsOptions = {
  origin: CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: false,
  allowedHeaders: "Content-Type, Authorization, Cookie",
};

app.use(cors(corsOptions));

//routes
app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/tags", tagRoutes);

app.use("/api/auth", authRoutes);
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("🚀 Moons Footwear API is running.");
});
