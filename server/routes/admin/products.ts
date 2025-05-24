import express from "express";
import {
  addProduct,
  addProductImage,
  deleteProduct,
  deleteProductImage,
  setProductFlags,
  updateProduct,
  updateProductCategory,
  getAllProducts,
} from "../../controllers/admin/product";
import { getProduct } from "../../controllers/product";

const router = express.Router();
router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/", addProduct);
router.post("/:id/flags", setProductFlags);
router.post("/:id/images", addProductImage);

router.put("/:id", updateProduct);
router.put("/:id/category", updateProductCategory);

router.delete("/:id", deleteProduct);
router.delete("/:id/images/:imageId", deleteProductImage);

export { router };
