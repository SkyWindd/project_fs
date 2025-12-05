import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret123";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token không tồn tại" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // chứa user_id, role
    next();
  } catch (err) {
    res.status(403).json({ error: "Token không hợp lệ" });
  }
};
