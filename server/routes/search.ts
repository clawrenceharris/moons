import express from "express";
import { getProductsBySearch } from "../controllers/product";

const router = express.Router();
router.get("/", getProductsBySearch);

export { router };
