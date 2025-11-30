// src/controllers/user.controller.js
import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid user id" });

    const user = await User.findOne({ user_id: id }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    // optionally remove password from response
    if (user.password) delete user.password;

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
