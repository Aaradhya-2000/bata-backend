

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const adminRoute = require("./routes/adminRoute")
const productroute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
// const orderRoute = require("./routes/orderRoute")
const paymentRoute = require("./routes/payment")
require("dotenv").config();
const app = express()

const PORT = process.env.PORT || 9000


app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DBCON).then(()=>{
    console.log("MongoDb Connected Succefully")
})

// ✅ Parse application/json
app.use(bodyParser.json());

app.use("/admin",adminRoute)
app.use("/product",productroute)
app.use("/user",userRoute)
// app.use("/order",orderRoute)
app.use("/api/payment",paymentRoute)



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})