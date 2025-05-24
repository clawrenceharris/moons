import express from "express";
import { getReview } from "../controllers/review";

const router = express.Router();
router.get("", getReview);

export { router };
