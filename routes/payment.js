const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../model/orderModel");

// Create Razorpay order and save order details in DB
router.post("/orders", async (req, res) => {
    console.log(req.body)
  try {
    const { name, email, city, contact, address, pincode, age, products,productID, amount,image} = req.body;
    

    // Create and save new order in MongoDB
    const order = await OrderModel.create({
      name,
      email,
      city,
      address,
      pincode,
      contact,
      age,
      products,
      productID,
      amount,
      image
    });

    // Initialize Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    // Razorpay order options
    const options = {
      amount: Math.round(amount * 100),  // amount in paise (integer)
      currency: "INR",
      receipt: `receipt_order_${order._id}`,
    };

    // Create Razorpay order
    instance.orders.create(options, (error, razorpayOrder) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong while creating Razorpay order" });
      }
      res.status(200).json({ data: razorpayOrder });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Verify Razorpay payment signature
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Create the string to hash
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Compute expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body)
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
