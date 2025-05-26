import { Request, Response } from "express";
import { executeQuery } from "../db";
export const getCategories = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM categories");
    return res.status(200).json(results); // Use .json() for consistency
  } catch (err: any) {
    console.error("Error in getCategories:", err); // Log the error for server-side debugging
    return res
      .status(500)
      .json({ error: "Failed to retrieve categories.", details: err.message });
  }
};

export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM subcategories");
    return res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getSubcategories:", err);
    return res
      .status(500)
      .json({
        error: "Failed to retrieve subcategories.",
        details: err.message,
      });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM brands");
    return res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getBrands:", err);
    return res
      .status(500)
      .json({ error: "Failed to retrieve brands.", details: err.message });
  }
};

export const getFlags = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM product_flags");
    return res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getFlags:", err);
    return res
      .status(500)
      .json({ error: "Failed to retrieve flags.", details: err.message });
  }
};
