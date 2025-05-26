import { Request, Response } from "express";
import { db } from "../db";

export const getUser = (req: Request, res: Response) => {
  const q = "SELECT * FROM users WHERE user_id = ?";
  db.query(q, [req.body.id], (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err.message });

    return results;
  });
};
