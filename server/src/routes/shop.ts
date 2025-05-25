import express from "express";
import { getAllProducts, getProductsByCategory } from "../controllers/product";

const router = express.Router();
router.get("/", getAllProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/category/:category/:subcategory", getProductsByCategory);

export { router };
