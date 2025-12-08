import Order from "../models/Order.js";

export const adminGetOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ created_at: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Không thể tải danh sách đơn hàng" });
  }
};

export const adminGetOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id });

    if (!order) return res.status(404).json({ error: "Không tìm thấy đơn hàng" });

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

export const adminUpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "delivering", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Trạng thái không hợp lệ" });
    }

    const order = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      { status, updated_at: new Date() },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: "Không tìm thấy đơn hàng" });

    res.json({ message: "Cập nhật thành công", order });
  } catch (err) {
    res.status(500).json({ error: "Không thể cập nhật" });
  }
};

export const adminDeleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ order_id: req.params.id });

    if (!order) return res.status(404).json({ error: "Không tìm thấy đơn hàng" });

    res.json({ message: "Xóa thành công", order });
  } catch (err) {
    res.status(500).json({ error: "Không thể xóa đơn hàng" });
  }
};
