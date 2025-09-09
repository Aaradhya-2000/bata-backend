const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const productroute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
// const orderRoute = require("./routes/orderRoute")
const paymentRoute = require("./routes/payment");
require("dotenv").config();

const app = express();

// ✅ PORT with fallback
const PORT = process.env.PORT || 9000;

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.DBCON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
});

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("✅ Backend is running fine!");
});

// ✅ Routes
app.use("/admin", adminRoute);
app.use("/product", productroute);
app.use("/user", userRoute);
// app.use("/order", orderRoute)
app.use("/api/payment", paymentRoute);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
