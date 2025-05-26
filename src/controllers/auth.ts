import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const login = (req: Request, res: Response) => {
//   const q = "SELECT * FROM users WHERE email = ?";
//   db.query(q, [req.body.email], (err: Error | null, data: any[]) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (data.length == 0) return res.status(404).send("User not found!");
//     const checkPassword = bcrypt.compareSync(
//       req.body.password,
//       data[0].password
//     );
//     if (!checkPassword) {
//       return res.status(400).send("Wrong password or email");
//     }
//     const token = jwt.sign({ id: data[0].id }, "secretkey");
//     const { password, ...rest } = data[0];
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .send(rest);
//     return res.status(200).send("Log in successful");
//   });
// };

// export const register = (req: Request, res: Response) => {
//   //check if user exists
//   const q = "SELECT * FROM users WHERE username = ?";
//   db.query(q, [req.body.username], (err, data: any[]) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (data.length) return res.status(409).send("User already exists!");
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     const q =
//       "INSERT INTO users(`first_name`, `last_name`, `username`, `email`, `password`) VALUES (?, ?, ?, ?, ?)";
//     const values = [
//       req.body.firstName,
//       req.body.lastName,
//       req.body.username,
//       req.body.email,
//       hashedPassword,
//     ];
//     db.query(q, values, (err, _) => {
//       if (err) return res.status(500).send(err);
//       return res.status(200).send("User has been created successfully!");
//     });
//   });
// };

// export const logout = (req: Request, res: Response) => {
//   res
//     .clearCookie("accessToken", {
//       secure: true,
//       sameSite: "none",
//     })
//     .status(200)
//     .send("Log out successful!");
// };
