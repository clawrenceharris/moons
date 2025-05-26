import { Request, Response } from "express";
import { executeQuery } from "../db";
export const getCategories = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM categories");
    res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getCategories:", err);
    res
      .status(500)
      .json({ error: "Failed to retrieve categories.", details: err.message });
  }
};

export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM subcategories");
    res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getSubcategories:", err);
    res.status(500).json({
      error: "Failed to retrieve subcategories.",
      details: err.message,
    });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM brands");
    res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getBrands:", err);
    res
      .status(500)
      .json({ error: "Failed to retrieve brands.", details: err.message });
  }
};

export const getFlags = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery("SELECT * FROM product_flags");
    res.status(200).json(results);
  } catch (err: any) {
    console.error("Error in getFlags:", err);
    res
      .status(500)
      .json({ error: "Failed to retrieve flags.", details: err.message });
  }
};
