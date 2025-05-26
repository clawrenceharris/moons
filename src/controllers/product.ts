import { Request, Response } from "express";
import { getDatabasePool } from "../db";

export async function getFullProductById(id: number) {
  const pool = getDatabasePool();
  let connection;

  try {
    connection = await pool.getConnection();

    const [products]: any = await connection.execute(
      `SELECT * FROM products WHERE published = TRUE AND is_archived = FALSE AND
        id = ? LIMIT 1`,
      [id]
    );
    const product = products[0];
    if (!product) return null;

    const [[category], [subcategories], [flags], [images], [variants]]: any =
      await Promise.all([
        connection.execute(
          `SELECT c.name FROM categories c
           JOIN product_categories pc ON c.id = pc.category_id
           WHERE pc.product_id = ?`,
          [id]
        ),
        connection.execute(
          `SELECT s.name FROM subcategories s
           JOIN product_subcategories ps ON ps.subcategory_id = s.id
           WHERE ps.product_id = ?`,
          [id]
        ),
        connection.execute(
          `SELECT pf.name FROM product_flags pf
           JOIN product_product_flags ppf ON pf.id = ppf.flag_id
           WHERE ppf.product_id = ?`,
          [id]
        ),
        connection.execute(
          `SELECT image_url, alt_text FROM product_images WHERE product_id = ?`,
          [id]
        ),
        connection.execute(
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
  } catch (error) {
    console.error(`Error in getFullProductById for ID ${id}:`, error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  let connection: any;
  try {
    const pool = getDatabasePool();
    connection = await pool.getConnection();
    const [p]: any = await connection.execute(
      `SELECT id FROM products WHERE published = TRUE AND is_archived = FALSE`
    );
    connection.release();

    const products = await Promise.all(
      p.map((p: any) => getFullProductById(p.id))
    );
    res.json(products.filter(Boolean)); // Filter out any nulls
  } catch (err: any) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ error: "No Id provided" });
      return;
    }
    const product = await getFullProductById(Number(id));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err: any) {
    console.error("Error in getProduct:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getProductsBySearch = async (req: Request, res: Response) => {
  const { query } = req.query;
  let connection: any;

  if (!query) {
    try {
      // Re-use logic from getAllProducts if query is empty
      const pool = getDatabasePool();
      connection = await pool.getConnection();
      const [p]: any = await connection.execute(
        `SELECT id FROM products WHERE published = TRUE AND is_archived = FALSE`
      );
      connection.release(); // Release early
      const products = await Promise.all(
        p.map((p: any) => getFullProductById(p.id))
      );
      res.json(products.filter(Boolean));
      return;
    } catch (err: any) {
      console.error("Error in getProductsBySearch (no query):", err);
      res.status(500).json({ error: err.message });
      return;
    }
  }

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
    const pool = getDatabasePool();
    connection = await pool.getConnection();
    const [p]: any = await connection.execute(sql, values);
    connection.release();

    const products = await Promise.all(
      p.map((p: any) => getFullProductById(p.id))
    );
    res.json(products.filter(Boolean));
  } catch (err: any) {
    console.error("Error in getProductsBySearch:", err);
    res.status(500).json({ error: err.message });
  }
};

const subcategoyExists = async (subcategory: string): Promise<boolean> => {
  const pool = getDatabasePool();
  let connection: any;
  try {
    connection = await pool.getConnection();
    const [results]: any = await connection.execute(
      "SELECT id FROM subcategories WHERE name = ?",
      [subcategory]
    );
    return results.length > 0;
  } catch (err: any) {
    console.error("Error checking subcategory existence:", err);
    throw new Error("Database error checking subcategory.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const categoryExists = async (category: string): Promise<boolean> => {
  const pool = getDatabasePool();
  let connection: any;
  try {
    connection = await pool.getConnection();
    const [results]: any = await connection.execute(
      "SELECT id FROM categories WHERE name = ?",
      [category]
    );
    return results.length > 0;
  } catch (err: any) {
    console.error("Error checking category existence:", err);
    throw new Error("Database error checking category.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category, subcategory } = req.params;
  let connection: any;

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

    const pool = getDatabasePool();
    connection = await pool.getConnection();
    const [rows]: any = await connection.execute(q, values);
    connection.release();

    const products = await Promise.all(
      rows.map((row: any) => getFullProductById(row.id))
    );

    res.json(products.filter(Boolean));
  } catch (err: any) {
    console.error("Error in getProductsByCategory:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getProductCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  let connection: any;
  const q = `
      SELECT *
      FROM categories c
      LEFT JOIN product_categories pc ON c.id = pc.category_id
      LEFT JOIN products p ON pc.product_id = p.id
      WHERE p.id = ?
      LIMIT 1
    `;

  try {
    const pool = getDatabasePool();
    connection = await pool.getConnection();
    const [results]: any = await connection.execute(q, [id]);
    res.json(results[0]);
  } catch (err: any) {
    console.error("Error in getProductCategory:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
