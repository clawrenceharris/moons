import express from "express";
import {
  getCategories,
  getSubcategories,
  getBrands,
  getFlags,
} from "../controllers/tags";

const router = express.Router();
router.get("/categories", getCategories);
router.get("/subcategories", getSubcategories);
router.get("/brands", getBrands);
router.get("/flags", getFlags);

export { router };
