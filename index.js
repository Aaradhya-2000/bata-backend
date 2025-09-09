// ✅ Import required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
// const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/payment");
require("dotenv").config();

// ✅ Initialize app
const app = express();

// ✅ PORT with fallback
const PORT = process.env.PORT || 9000;

// ✅ Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ CORS setup for frontend (Vercel)
app.use(cors({
    origin: [
        "https://bata-frontend-theta.vercel.app/", // Replace with your deployed Vercel frontend URL
        "http://localhost:9000"
    ],
    credentials: true
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.DBCON)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("✅ Backend is running fine!");
});

// ✅ Routes
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
// app.use("/order", orderRoute);
app.use("/api/payment", paymentRoute);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
