const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link order to user
  name: String,
  email: String,
  city: String,
  address: String,
  pincode: Number,
  age: Number,
  contact: String,
  products: [String],
  productID: [String],
  image: String,
  amount: String,
  taskstatus: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
