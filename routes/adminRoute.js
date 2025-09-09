

const express = require("express")
const route = express.Router()


const AdminController = require("../controller/adminController")


route.post("/adminlogin",AdminController.adminLogin)
route.post("/productsave",AdminController.productSave)
route.get("/ourpro",AdminController.OurOrder)
route.get("/changetaskstatus",AdminController.changeTaskStatus)
route.get("/allpro",AdminController.allpro)
route.delete("/deletepro",AdminController.deletepro)
route.put("/updatepro",AdminController.updatepro)


module.exports = route