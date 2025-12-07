import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import storeRoutes from "./routes/store.routes.js";
import adminUserRoutes from "./routes/adminUser.routes.js";
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
export default app;
