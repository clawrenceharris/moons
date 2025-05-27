import express from "express";
import { getFavorites } from "../controllers/favorite";
import { auth } from "../middleware";

const router = express.Router();
router.get("/", auth, getFavorites);

export { router };
