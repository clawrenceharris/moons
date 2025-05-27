import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; username: string; email: string }; // Adjust type based on your JWT payload
  }
}

const JWT_SECRET =
  process.env.JWT_SECRET || "your_fallback_secret_key_if_not_set";

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied." });
    return;
  }

  // Tokens are usually sent as "Bearer YOUR_TOKEN_STRING". Split it.
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    res.status(401).json({ message: 'Token format is "Bearer <token>".' });
    return;
  }

  try {
    const decoded: any = jwt.verify(tokenParts[1], JWT_SECRET); // Verify the token

    // Attach user from token payload to the request object
    req.user = decoded.user;
    next(); // Proceed to the next middleware/route handler
  } catch (err: any) {
    console.error("Token verification failed:", err);
    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired." });
      return;
    }
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token." });
      return;
    }
    res
      .status(500)
      .json({ message: "Server error during token verification." });
  }
};

export default auth;
