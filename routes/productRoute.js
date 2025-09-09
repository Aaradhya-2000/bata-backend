



const express = require("express")
const route = express.Router()


const productController = require("../controller/productController")



route.get("/homepage",productController.homeDisplay)
route.get("/homepageMen",productController.homeMenDisplay)
route.get("/homepageWomen",productController.homeWomenDisplay)
route.get("/prodetails",productController.proDetails)
route.get("/review",productController.review)


module.exports = route