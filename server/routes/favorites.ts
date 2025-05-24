import express from "express";
import { getFavorites } from "../controllers/favorite";

const router = express.Router();
router.get("", getFavorites);

export { router };
