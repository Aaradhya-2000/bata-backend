const AdminModel = require("../model/adminModel");
const dotenv = require("dotenv");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");
const OrderModel = require("../model/orderModel")
const productModel = require("../model/productModel")
dotenv.config();
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken") ;
const bcrypt = require("bcrypt") ;
// MULTER STORAGE SETUP
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'AaradhyaPhotos',
//     format: async (req, file) => 'jpeg', // ✅ fix: param should be `(req, file)`
//     public_id: (req, file) => Date.now() + '-' + file.originalname // ✅ fix: use `file.originalname`
//   }
// });

// const upload = multer({ storage: storage }).array('images', 10); // Accept up to 10 files

// MULTER STORAGE SETUP
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AaradhyaPhotos',
    format: async (req, file) => 'jpeg',
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2* 1024* 1024 } // 2MB max per file
  
}).array('images', 10);


// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { adminid, password } = req.body;
    const Admin = await AdminModel.findOne({ adminid });

    if (!Admin) {
      return res.status(401).send({ msg: "Invalid Id" });
    }

    const isMatch = await bcrypt.compare(password, Admin.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: Admin._id, adminid: Admin.adminid },
      process.env.SECRETE,
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      msg: "Successfully Login",
      token,
      Admin: { id: Admin._id, adminid: Admin.adminid },
    });
  } catch (error) {
    return res.status(500).send({ msg: "Server error", error });
  }

};

// Upload Product Images
const productSave = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ msg: "Error uploading file", error: err.message });
    }

    // ✅ Access uploaded files from req.files
    try {
      const imageURL = req.files.map(file => file.path)
      const  {name,description,price,category } = req.body

      const Product = new productModel({
         name : name,
         description: description,
         price : price,
         category : category,
         images : imageURL,
         defaultimage : imageURL[0]
      })

      await Product.save();
      res.status(200).send("Data save Succefully")
    } catch (error) {

       res.status(500).send({msg:`file size should not be greater than 50kb ${error}`})
    }
    

   
  });



};

const OurOrder = async(req,res)=>{
  try {
    const orders = await OrderModel.find()
       // populate only name & price
      .lean(); // plain JS objects, easier for frontend
     console.log(orders)
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}
// controllers/taskController.js
const changeTaskStatus = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ msg: "❌ ID is required" });
  }

  try {
    await OrderModel.findByIdAndUpdate(id, { taskstatus: true });
    return res.status(200).json({ msg: "✅ Task status updated" });
  } catch (error) {
    console.error("Update task status error:", error);
    return res.status(500).json({ msg: "❌ Status update failed" });
  }
};







// ✅ Delete Task
const taskDelete = async (req, res) => {
  const { id } = req.query;

  try {
    const deleted = await taskModal.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ msg: "❌ Task not found" });
    }

    return res.status(200).json({ msg: "✅ Task deleted", deleted });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ msg: "❌ Server error" });
  }
};

const allpro = async(req,res)=>{
 
  try {
    const Product = await productModel.find()
    // console.log(Product)
    res.status(200).send(Product)
   
    
} catch (error) {
    res.status(401).send("error :",error.message)
}
// res.send("okk")
}
const deletepro = async(req,res)=>{
  const {id} = req.query
  try {
    const Pro = await productModel.findByIdAndDelete(id)
    res.status(200).send({msg:"Deleted Succefully"})
  } catch (error) {
    res.status(500).send({msg:"Not possible"})
  }
}
const updatepro = async(req,res)=>{
  const { id } = req.query;
  // console.log(req.query)
  // res.send("OKK")
  const updateData = req.body;
  try {
    const updated = await productModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send({ msg: "Product updated", updated });
  } catch (error) {
    res.status(500).send({ msg: "Update failed" });
  }
}
module.exports = {
  adminLogin,
  productSave,
  OurOrder,
  changeTaskStatus,
  allpro,
  deletepro,
  updatepro
};
