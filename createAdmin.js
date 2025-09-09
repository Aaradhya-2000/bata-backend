const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const AdminModel = require("./model/adminModel");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DBCON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("admin1234", 10);

    const adminExists = await AdminModel.findOne({ adminid: "admin" });
    if (adminExists) {
      console.log("⚠️ Admin already exists");
    } else {
      await AdminModel.create({
        adminid: "Admin",
        password: hashedPassword,
      });
      console.log("✅ Admin created successfully!");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
