import express from "express";
import { getAllProducts, getProduct } from "../controllers/product";

const router = express.Router();

router.get("/:id", getProduct);

export { router };
