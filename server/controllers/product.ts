import { Request, Response } from "express";
import { db } from "../db/connection";
import { Product, ProductCategory, ProductFlag } from "../../shared/types";
export async function getFullProductById(id: number): Promise<Product | null> {
  const [products]: any = await db.promise().query(
    `SELECT * FROM products WHERE published = TRUE AND is_archived = FALSE AND 
      id = ? LIMIT 1`,
    [id]
  );
  const product = products[0];
  if (!product) return null;

  const [[category], [subcategories], [flags], [images], [variants]]: any =
    await Promise.all([
      db.promise().query(
        `SELECT c.name FROM categories c
         JOIN product_categories pc ON c.id = pc.category_id
         WHERE pc.product_id = ?`,
        [id]
      ),
      db.promise().query(
        `SELECT s.name FROM subcategories s
         JOIN product_subcategories ps ON ps.subcategory_id = s.id
         WHERE ps.product_id = ?`,
        [id]
      ),
      db.promise().query(
        `SELECT pf.name FROM product_flags pf
         JOIN product_product_flags ppf ON pf.id = ppf.flag_id
         WHERE ppf.product_id = ?`,
        [id]
      ),
      db
        .promise()
        .query(
          `SELECT image_url, alt_text FROM product_images WHERE product_id = ?`,
          [id]
        ),
      db.promise().query(
        `SELECT id, color, size, stock
         FROM product_variants
         WHERE product_id = ?`,
        [id]
      ),
    ]);
  return {
    ...product,
    category: category[0]?.name,
    subcategories: subcategories.map((item: any) => item.name),
    flags: flags.map((item: any) => item.name),
    images: images.map((item: any) => ({
      imageUrl: item.image_url,
      altText: item.alt_text,
    })),
    variants: variants[0],
  };
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [p]: any = await db
      .promise()
      .query(
        `SELECT id FROM products WHERE published = TRUE AND is_archived = FALSE`
      );
    const products = await Promise.all(
      p.map((p: any) => getFullProductById(p.id))
    );
    // Filter out any nulls (in case a product was deleted between queries)
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(500).json({ error: "No Id provided" });

      return;
    }
    const product = await getFullProductById(Number(id));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsBySearch = async (req: Request, res: Response) => {
  const { query } = req.query;
  const q = query.toString().trim().replace(/'/g, "");
  const words = q.split(/\s+/).filter(Boolean);

  const whereClauses: string[] = [];
  const values: string[] = [];
  for (const word of words) {
    const like = `%${word}%`;
    whereClauses.push(
      "(p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ? OR s.name LIKE ? OR pf.name LIKE ?)"
    );
    values.push(like, like, like, like, like);
  }

  const sql = ` SELECT p.id FROM products p
                LEFT JOIN product_categories pc ON p.id = pc.product_id
                LEFT JOIN categories c ON pc.category_id = c.id
                LEFT JOIN product_subcategories ps ON p.id = ps.product_id
                LEFT JOIN subcategories s ON ps.subcategory_id = s.id
                LEFT JOIN product_product_flags ppf ON p.id = ppf.product_id
                LEFT JOIN product_flags pf ON ppf.flag_id = pf.id
     ${whereClauses.length ? " WHERE " + whereClauses.join(" OR ") : ""}
    `;
  try {
    const [p]: any = await db.promise().query(sql, values);
    const products = await Promise.all(
      p.map((p: any) => getFullProductById(p.id))
    );
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
const subcategoyExists = (subcategory: string) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id FROM subcategories WHERE name = ?";
    db.query(query, [subcategory], (err, results: any[]) => {
      if (err) return reject(err);
      if (results.length === 0) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};
const categoryExists = (category: string) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id FROM categories WHERE name = ?";
    db.query(query, [category], (err, results: any[]) => {
      if (err) return reject(err);
      if (results.length === 0) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};
export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category, subcategory } = req.params;

  try {
    // Validate category and subcategory
    const [categoryExistsResult, subcategoryExistsResult] = await Promise.all([
      categoryExists(category),
      subcategory ? subcategoyExists(subcategory) : Promise.resolve(true),
    ]);

    if (!categoryExistsResult) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    if (subcategory && !subcategoryExistsResult) {
      res.status(404).json({ error: "Subcategory not found" });
      return;
    }

    // Query for product IDs matching the category (and subcategory if provided)
    const q = `
      SELECT DISTINCT p.id
      FROM products p
      JOIN product_categories pc ON p.id = pc.product_id
      JOIN categories c ON pc.category_id = c.id
      ${
        subcategory
          ? "JOIN product_subcategories ps ON p.id = ps.product_id JOIN subcategories s ON ps.subcategory_id = s.id"
          : ""
      }
      WHERE c.name = ?
      ${subcategory ? "AND s.name = ?" : ""}
      AND p.published = TRUE AND p.is_archived = FALSE
    `;
    const values = subcategory ? [category, subcategory] : [category];

    const [rows]: any = await db.promise().query(q, values);

    // Get full product data for each ID
    const products = await Promise.all(
      rows.map((row: any) => getFullProductById(row.id))
    );

    // Filter out any nulls (in case a product was deleted between queries)
    res.json(products.filter(Boolean));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const getProductCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const q = `
      SELECT *
      FROM categories c
      LEFT JOIN product_categories pc ON c.id = pc.category_id
      LEFT JOIN products p ON pc.product_id = p.id
      WHERE p.id = ?
      LIMIT 1
    `;

  db.query(q, [id], (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};
