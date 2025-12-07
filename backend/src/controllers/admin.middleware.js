export function requireAdmin(req, res, next) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Bạn không có quyền truy cập" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: "Lỗi phân quyền" });
  }
}
