import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import Address from "./src/models/Address.js";
import Category from "./src/models/Category.js";
import MenuItem from "./src/models/MenuItem.js";
import Drone from "./src/models/Drone.js";
import DroneStatus from "./src/models/DroneStatus.js";
import Order from "./src/models/Order.js";
import OrderDetail from "./src/models/OrderDetail.js";
import Payment from "./src/models/Payment.js";
import Tracking from "./src/models/Tracking.js";

import mock from "./mock/mockData.js"; // ← FILE mockData bạn gửi

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Xóa dữ liệu cũ
    await Promise.all([
      User.deleteMany(),
      Address.deleteMany(),
      Category.deleteMany(),
      MenuItem.deleteMany(),
      Drone.deleteMany(),
      DroneStatus.deleteMany(),
      Order.deleteMany(),
      OrderDetail.deleteMany(),
      Payment.deleteMany(),
      Tracking.deleteMany(),
    ]);

    // Import dữ liệu mới
    await User.insertMany(mock.users);
    await Address.insertMany(mock.addresses);
    await Category.insertMany(mock.categories);
    await MenuItem.insertMany(mock.menuitems);
    await Drone.insertMany(mock.drones);
    await DroneStatus.insertMany(mock.dronestatus);
    await Order.insertMany(mock.orders);
    await OrderDetail.insertMany(mock.orderdetails);
    await Payment.insertMany(mock.payments);
    await Tracking.insertMany(mock.tracking);

    console.log("Mock data imported successfully!");
    process.exit();

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
