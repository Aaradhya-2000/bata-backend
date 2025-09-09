

const mongoose = require("mongoose")
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    city:String,
    address:String,
    pincode:Number,
    password:String,
    age:Number
})

module.exports = mongoose.model("user",userSchema)