import { Request, Response } from "express";
import { getDatabasePool } from "../db";
import { PoolConnection } from "mysql2/promise";

export const getReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pool = getDatabasePool();
  let connection: PoolConnection = await pool.getConnection();
  try {
    // Re-use logic from getAllProducts if query is empty
    const pool = getDatabasePool();
    connection = await pool.getConnection();
    const [reviews]: any = await connection.execute(
      `SELECT * FROM product_reviews WHERE product_id = ?`,
      [id]
    );
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
