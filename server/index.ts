import express from "express";
import {
  userRoutes,
  authRoutes,
  favoriteRoutes,
  productRoutes,
  shopRoutes,
  searchRoutes,
  tagRoutes,
} from "./routes/";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { adminProductRoutes } from "./routes/admin";

const app = express();

// middlewares
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: false,
  allowedHeaders: "Content-Type, Authorization, Cookie",
};

app.use(cors(corsOptions));

app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/tags", tagRoutes);

app.use("/api/favorites", favoriteRoutes);
app.use("/api/auth", authRoutes);
app.listen(8800, () => {
  console.log("API working!");
});
