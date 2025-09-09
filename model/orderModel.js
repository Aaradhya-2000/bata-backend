const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  address: String,
  pincode: Number,
  age: Number,
  contact: String, // if you're saving contact info
  products: [String],
  productID :[String],
  image:String,
  amount: String,
  
  taskstatus: {type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
