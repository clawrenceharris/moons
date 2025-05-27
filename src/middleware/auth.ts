// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; username: string; email: string }; // Adjust type based on your JWT payload
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET";

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get credentials from header (assuming Authorization header for JWTs)
  const authHeader = req.header("Authorization");

  // Check if no authorization header is present
  if (!authHeader) {
    res.status(401).json({
      message:
        "Authentication required. Please log in to access this resource.",
    });
    return;
  }

  // Expecting format "Bearer <credentials>"
  const credentialsParts = authHeader.split(" ");
  if (credentialsParts.length !== 2 || credentialsParts[0] !== "Bearer") {
    res
      .status(401)
      .json({ message: "Invalid authentication format. Please log in again." });
    return;
  }

  const userCredentials = credentialsParts[1]; // This is the JWT

  try {
    const decoded: any = jwt.verify(userCredentials, JWT_SECRET); // Verify the credentials

    // Attach user from payload to the request object
    req.user = decoded.user;
    next(); // Proceed to the next middleware/route handler
  } catch (err: any) {
    console.error("Credentials verification failed:", err); // Log the technical error for debugging
    if (err.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ message: "Your session has expired. Please log in again." });
      return;
    }
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        message:
          "Authentication failed. Your credentials are invalid. Please log in again.",
      });
      return;
    }
    // Generic fallback for other server-side verification issues
    res.status(500).json({
      message: "An internal server error occurred during authentication.",
    });
  }
};

export default auth;
