



const express = require("express")
const route = express.Router()


const userController = require("../controller/userController")



route.post("/signup",userController.signup)
route.post("/login",userController.userLogin)
route.post("/checkout",userController.userCheckout)
route.get("/getuser",userController.userGet)
route.get("/return",userController.returnPro)
route.post("/review",userController.userReview)
route.get("/getreviews",userController.getUserReview)
route.get("/order",userController.order)


module.exports = route