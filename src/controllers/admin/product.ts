import { Request, Response } from "express";
import { executeQuery, getDatabasePool } from "../../db";
import { PoolConnection } from "mysql2/promise";
import { getFullProductById } from "../product";
import { normalizeSlug } from "../../utils";

export const getAllProducts = async (req: Request, res: Response) => {
  let connection: PoolConnection | undefined;
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
    res.status(200).json(products.filter(Boolean)); // Filter out any nulls
  } catch (err: any) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({
      error: "Failed to retrieve all products.",
      details: err.message,
    });
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
    stockQuantity,
    discount,
    published,
    isArchived,
  } = req.body;

  const fields: string[] = [];
  const values: any[] = [];

  // Build dynamic update query
  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }
  if (price !== undefined) {
    fields.push("price = ?");
    values.push(price);
  }
  if (description !== undefined) {
    fields.push("description = ?");
    values.push(description);
  }
  if (stockQuantity !== undefined) {
    fields.push("stock_quantity = ?");
    values.push(stockQuantity);
  }
  if (brand_id !== undefined) {
    fields.push("brand_id = ?");
    values.push(brand_id);
  }
  if (categoryId !== undefined) {
    fields.push("category_id = ?");
    values.push(categoryId);
  }

  if (discount !== undefined) {
    fields.push("discount = ?");
    values.push(discount);
  }
  if (published !== undefined) {
    fields.push("published = ?");
    values.push(published);
  }
  if (isArchived !== undefined) {
    fields.push("is_archived = ?");
    values.push(isArchived);
  }

  if (fields.length === 0) {
    res.status(400).json({ error: "No fields provided for update." });
    return;
  }

  try {
    const updateQuery = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id); // Add ID to the end of values for WHERE clause

    const result: any = await executeQuery<any>(updateQuery, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Product not found or no changes made." });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully." });
  } catch (err: any) {
    console.error("Error in updateProduct:", err);
    res
      .status(500)
      .json({ error: "Failed to update product.", details: err.message });
  }
};

export const setProductFlags = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { flags } = req.body;

  if (!Array.isArray(flags)) {
    res.status(400).json({ error: "Flags must be an array." });
    return;
  }

  const pool = getDatabasePool();
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection(); // Get a connection for the transaction
    await connection.beginTransaction(); // Start the transaction

    // Delete existing flags for the product
    await connection.execute(
      "DELETE FROM product_product_flags WHERE product_id = ?",
      [id]
    );

    // Insert new flags (only if flags array is not empty)
    if (flags.length > 0) {
      // Find IDs for the given flag names
      const [flagIds]: any = await connection.execute(
        `SELECT id, name FROM product_flags WHERE name IN (?)`,
        [flags] // Pass the array directly for IN clause
      );

      // Check if all provided flags exist
      const existingFlagNames = new Set(flagIds.map((f: any) => f.name));
      const missingFlags = flags.filter(
        (flag: string) => !existingFlagNames.has(flag)
      );
      if (missingFlags.length > 0) {
        // Rollback if some flags don't exist
        await connection.rollback();
        res.status(400).json({
          error: "One or more flags not found.",
          missingFlags: missingFlags,
        });
        return;
      }

      // Prepare values for batch insert
      const insertValues = flagIds.map((flag: any) => [id, flag.id]);

      // Batch insert the new flags
      await connection.query(
        `INSERT INTO product_product_flags (product_id, flag_id) VALUES ?`,
        [insertValues]
      );
    }

    await connection.commit();
    res.status(200).json({ success: true, message: "Product flags updated." });
  } catch (err: any) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in setProductFlags:", err);
    res
      .status(500)
      .json({ error: "Failed to update product flags.", details: err.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const updateProductCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category } = req.body;

  if (!category) {
    res.status(400).json({ error: "Category name is required." });
    return;
  }

  try {
    // First, get the category ID from the name
    const [categoryRows]: any = await executeQuery(
      "SELECT id FROM categories WHERE name = ?",
      [category]
    );

    if (categoryRows.length === 0) {
      res.status(404).json({ error: "Category not found." });
      return;
    }
    const categoryId = categoryRows[0].id;

    const updateResult: any = await executeQuery<any>(
      `UPDATE product_categories SET category_id = ? WHERE product_id = ?`,
      [categoryId, id]
    );

    if (updateResult.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "Product category not found or no change made." });
      return;
    }

    res.status(200).json({ success: true, message: "Category updated." });
  } catch (err: any) {
    console.error("Error in updateProductCategory:", err);
    res.status(500).json({
      error: "Failed to update product category.",
      details: err.message,
    });
  }
};

export const addProductImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageUrl, altText } = req.body;

  if (!imageUrl) {
    res.status(400).json({ error: "Image URL is required." });
    return;
  }

  try {
    const result: any = await executeQuery<any>(
      `INSERT INTO product_images (product_id, image_url, alt_text) VALUES (?, ?, ?)`,
      [id, imageUrl, altText || null]
    );
    res.status(201).json({
      success: true,
      imageId: result.insertId,
      message: "Image added successfully.",
    });
  } catch (err: any) {
    console.error("Error in addProductImage:", err);
    res
      .status(500)
      .json({ error: "Failed to add product image.", details: err.message });
  }
};

export const getProductsBySearch = async (req: Request, res: Response) => {
  const { query } = req.query;
  let connection: PoolConnection | undefined;

  if (!query) {
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
      res.status(200).json(products.filter(Boolean));
      return;
    } catch (err: any) {
      res.status(500).json({
        error: "Failed to retrieve all products for search.",
        details: err.message,
      });
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
      "(p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ? OR s.name LIKE ?)"
    );
    values.push(like, like, like, like);
  }

  const sql = `
    SELECT DISTINCT
      p.id -- Select only id here, as getFullProductById will fetch full data
    FROM products p
    LEFT JOIN product_categories pc ON p.id = pc.product_id
    LEFT JOIN categories c ON pc.category_id = c.id
    LEFT JOIN product_subcategories ps ON p.id = ps.product_id -- Assuming product_subcategories is a join table too
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
    res.status(200).json(products.filter(Boolean));
  } catch (err: any) {
    console.error("Error in getProductsBySearch:", err);
    res
      .status(500)
      .json({ error: "Failed to search products.", details: err.message });
  }
};

export const deleteProductImage = async (req: Request, res: Response) => {
  const { id, imageId } = req.params; // id is product_id, imageId is id of the image

  try {
    const result: any = await executeQuery<any>(
      `DELETE FROM product_images WHERE id = ? AND product_id = ?`,
      [imageId, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Image not found or does not belong to this product.",
      });
      return;
    }

    res.status(200).json({ success: true, message: "Image deleted." });
  } catch (err: any) {
    console.error("Error in deleteProductImage:", err);
    res
      .status(500)
      .json({ error: "Failed to delete product image.", details: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result: any = await executeQuery<any>(
      `DELETE FROM products WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    res.status(200).json({ success: true, message: "Product deleted." });
  } catch (err: any) {
    console.error("Error in deleteProduct:", err);
    res
      .status(500)
      .json({ error: "Failed to delete product.", details: err.message });
  }
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
    res.status(400).json({
      error:
        "Missing required product fields (name, price, subcategory, category, brand).",
    });
    return;
  }

  const pool = getDatabasePool();
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert/Get Brand
    await connection.execute(
      `INSERT INTO brands (name) VALUES (?) ON DUPLICATE KEY UPDATE name = name`,
      [brand]
    );
    const [brandIdResult]: any = await connection.execute(
      `SELECT id FROM brands WHERE name = ?`,
      [normalizeSlug(brand)]
    );
    const brandId = brandIdResult[0]?.id;
    if (!brandId) {
      throw new Error("Failed to retrieve brand ID after insert/update.");
    }

    // Get Subcategory ID
    const [subcatRows]: any = await connection.execute(
      `SELECT id FROM subcategories WHERE name = ?`,
      [subcategory]
    );
    if (subcatRows.length === 0) {
      throw new Error(`Subcategory '${subcategory}' not found.`);
    }
    const subcategoryId = subcatRows[0].id;

    // Insert Product
    const [insertProductResult]: any = await connection.execute(
      `INSERT INTO products (name, price, description, brand_id, stock_quantity, published, is_archived)
       VALUES (?, ?, ?, ?, ?, TRUE, FALSE)`, // Default published/is_archived
      [name, price, description || "", brandId, stockQuantity || 0]
    );
    const productId = insertProductResult.insertId;

    //  get the category ID
    const [categoryRows]: any = await connection.execute(
      `SELECT id FROM categories WHERE name = ?`,
      [category]
    );
    if (categoryRows.length === 0) {
      throw new Error(`Category '${category}' not found.`);
    }
    const categoryId = categoryRows[0].id;

    // Then insert into product_categories join table
    await connection.execute(
      `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`,
      [productId, categoryId]
    );

    await connection.commit();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      productId,
    });
  } catch (err: any) {
    if (connection) {
      await connection.rollback();
    }
    const status = err.message.includes("not found") ? 404 : 500;
    res
      .status(status)
      .json({ error: "Failed to add product.", details: err.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
