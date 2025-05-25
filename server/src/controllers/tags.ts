import { Request, Response } from "express";
import { db } from "../db";

export const getCategories = (req: Request, res: Response) => {
  const q = `SELECT * FROM categories`;
  db.query(q, (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.send(results);
  });
};

export const getSubcategories = (req: Request, res: Response) => {
  const q = `SELECT * FROM subcategories`;
  db.query(q, (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.send(results);
  });
};

export const getBrands = (req: Request, res: Response) => {
  const q = `SELECT * FROM brands`;
  db.query(q, (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.send(results);
  });
};

export const getFlags = (req: Request, res: Response) => {
  const q = `SELECT * FROM product_flags`;
  db.query(q, (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(err);

    return res.send(results);
  });
};
