import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  payment_id: Number,
  order_id: Number,
  payment_method: String,
  amount: Number,
  provider_transaction_id: String,
  status: String,
  transaction_time: String,
});

export default mongoose.model("Payment", PaymentSchema);
