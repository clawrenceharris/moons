import express from "express";
import { getProductsBySearch } from "../../controllers/admin/product";

const router = express.Router();
router.get("/search", getProductsBySearch);

export { router };
