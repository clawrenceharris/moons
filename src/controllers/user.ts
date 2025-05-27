import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { executeQuery } from "../db"; // Assuming executeQuery is available

// Make sure you have JWT_SECRET in your .env (and Heroku Config Vars)
const JWT_SECRET =
  process.env.JWT_SECRET || "your_fallback_secret_key_if_not_set";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "Please enter all required fields." });
    return;
  }

  try {
    // Check if user already exists
    const existingUsers = await executeQuery<{ id: number }>(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      res.status(409).json({ error: "Username or email already exists." });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Store user in database
    const result = await executeQuery<any>(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );

    res
      .status(201)
      .json({
        message: "User registered successfully!",
        userId: result.insertId,
      });
  } catch (err: any) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({
        error: "Server error during registration.",
        details: err.message,
      });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Please enter email and password." });
    return;
  }

  try {
    // Find user by email
    const users = await executeQuery<{
      id: number;
      username: string;
      email: string;
      password_hash: string;
    }>(
      "SELECT id, username, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      res.status(400).json({ error: "Invalid credentials." });
      return;
    }

    const user = users[0];

    // Compare provided password with hashed password from DB
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials." });
      return;
    }

    // Generate JWT Token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        return res
          .status(500)
          .json({ error: "Server error generating token." }); // Keep return here as it's inside a callback
      }
      res.status(200).json({ message: "Logged in successfully!", token });
    });
  } catch (err: any) {
    console.error("Error logging in user:", err);
    res
      .status(500)
      .json({ error: "Server error during login.", details: err.message });
  }
};
