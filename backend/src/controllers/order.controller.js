import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

    res.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
