const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  productid: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,      // rating as number
    required: true,
    min: 1,
    max: 5,
  },
  userName: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // optional: add createdAt and updatedAt fields

module.exports = mongoose.model("Review", reviewSchema);
