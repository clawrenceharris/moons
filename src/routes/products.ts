import express from "express";
import { getAllProducts, getProduct } from "../controllers/product";
import { getReviews } from "../controllers/review";

const router = express.Router();

router.get("/:id", getProduct);
router.get("/:id/reviews", getReviews);

export { router };
