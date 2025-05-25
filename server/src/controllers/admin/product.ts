import { Request, Response } from "express";
import { db } from "../../db/connection";
import { normalizeSlug } from "../../utils";
import { getFullProductById } from "../product";
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [p]: any = await db.promise().query(`SELECT id FROM products`);
    const products = await Promise.all(
      p.map((p: any) => getFullProductById(p.id))
    );
    // Filter out any nulls (in case a product was deleted between queries)
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    brand_id,
    categoryId,
    subcategoryId,
    stockQuantity,
    discount,
    published,
    isArchived,
  } = req.body;
  const fields: string[] = [];
  const values: any[] = [];
  if (name) {
    fields.push("name = ?");
    values.push(name);
  }
  if (price) {
    fields.push("price = ?");
    values.push(price);
  }
  if (description) {
    fields.push("description = ?");
    values.push(description);
  }
  if (stockQuantity) {
    fields.push("stock_quantity = ?");
    values.push(stockQuantity);
  }
  if (brand_id) {
    fields.push("brand_id = ?");
    values.push(brand_id);
  }
  if (categoryId) {
    fields.push("category_id = ?");
    values.push(categoryId);
  }
  if (subcategoryId) {
    fields.push("subcategory_id = ?");
    values.push(subcategoryId);
  }
  if (discount) {
    fields.push("discount = ?");
    values.push(discount);
  }
  if (published !== undefined) {
    fields.push("published = ?");
    values.push(published);
  }
  if (isArchived) {
    fields.push("is_archived = ?");
    values.push(isArchived);
  }
  try {
    const updateQuery = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;

    values.push(id);
    await db.promise().query(updateQuery, values);
  } catch (err) {
    res.send({ error: err.message });
  }
};

export const setProductFlags = (req: Request, res: Response) => {
  const { id } = req.params;
  const { flags } = req.body;

  if (!Array.isArray(flags)) {
    res.status(400).json({ error: "Flags must be an array." });
    return;
  }

  const deleteQuery = "DELETE FROM product_product_flags WHERE product_id = ?";

  db.query(deleteQuery, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (flags.length === 0) {
      res.json({ success: true, error: "Flags cleared." });
      return;
    }

    // Use placeholders instead of interpolated strings
    const insertQuery = `
      INSERT INTO product_product_flags (product_id, flag_id)
      SELECT ?, id FROM product_flags WHERE name = ?`;

    const tasks = flags.map(
      (flag: string) =>
        new Promise((resolve, reject) => {
          db.query(insertQuery, [id, flag], (insertErr) => {
            if (insertErr) return reject(insertErr);
            resolve(true);
          });
        })
    );

    Promise.all(tasks)
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(500).json({ error: err.message }));
  });
};

export const updateProductCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { category } = req.body;

  if (!category) {
    res.status(400).json({ error: "Category name is required." });
    return;
  }

  const query = `
    UPDATE product_categories pc
    JOIN categories c ON c.id = pc.category_id
    SET pc.category_id = (SELECT id FROM categories WHERE name = ?)
    WHERE pc.product_id = ?
  `;

  db.query(query, [category, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Category updated." });
  });
};
export const addProductImage = (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageUrl, altText } = req.body;

  const query = `
    INSERT INTO product_images (product_id, image_url, alt_text)
    VALUES (?, ?, ?)
  `;

  db.query(query, [id, imageUrl, altText], (err, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, imageId: result.insertId });
  });
};

export const getProductsBySearch = (req: Request, res: Response) => {
  const { query } = req.query;
  const q = query.toString().trim().replace(/'/g, "");
  const words = q.split(/\s+/).filter(Boolean);

  const whereClauses: string[] = [];
  const values: string[] = [];
  for (const word of words) {
    const like = `%${word}%`;
    whereClauses.push(
      "(p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ? OR s.name LIKE ?)"
    );
    values.push(like, like, like, like);
  }

  const sql = `
    SELECT DISTINCT 
      p.*, 
      
    FROM products p
    LEFT JOIN product_categories pc ON p.id = pc.product_id
    LEFT JOIN categories c ON pc.category_id = c.id
    LEFT JOIN subcategories s ON p.subcategory_id = s.id
    ${whereClauses.length ? " WHERE " + whereClauses.join(" OR ") : ""}
  `;

  db.query(sql, values, (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
export const deleteProductImage = (req: Request, res: Response) => {
  const { id, imageId } = req.params;

  const query = `
    DELETE FROM product_images WHERE id = ? AND product_id = ?
  `;

  db.query(query, [imageId, id], (err, result: any) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Image not found or does not belong to this product.",
      });
    }

    res.json({ success: true, message: "Image deleted." });
  });
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `
    DELETE FROM products WHERE id = ?
  `;

  db.query(query, [id], (err, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Image deleted." });
  });
};
export const addProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    subcategory,
    category,
    brand,
    stockQuantity,
  } = req.body;

  if (!name || !price || !subcategory || !category || !brand) {
    res.status(400).json({ error: "Missing required product fields." });
    return;
  }

  try {
    // 1. Get or insert brand
    const [brandRow] = await db
      .promise()
      .query(
        `INSERT INTO brands (name) VALUES (?) ON DUPLICATE KEY UPDATE name = name`,
        [brand]
      );
    const [brandIdResult] = await db
      .promise()
      .query(`SELECT id FROM brands WHERE name = ?`, [normalizeSlug(brand)]);
    const brandId = (brandIdResult as any)[0]?.id;

    // 2. Get subcategory ID
    const [subcatRows] = await db
      .promise()
      .query(`SELECT id FROM subcategories WHERE name = ?`, [subcategory]);
    if (!(subcatRows as any[]).length) {
      res
        .status(404)
        .json({ error: `Subcategory '${subcategory}' not found.` });
      return;
    }
    const subcategoryId = (subcatRows as any)[0].id;

    // 3. Insert product
    const [insertResult] = await db.promise().query(
      `INSERT INTO products (name, price, description, brand_id, subcategory_id, stock_quantity)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        price,
        description || "",
        brandId,
        subcategoryId,
        stockQuantity || 0,
      ]
    );
    const productId = (insertResult as any).insertId;

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      productId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
