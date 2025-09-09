
const productModel = require("../model/productModel")
const reviewModel = require("../model/revirewModel")
const homeDisplay = async(req,res)=>{
    
    
    
    try {
        const Product = await productModel.find()
        res.status(200).send(Product)
       
        
    } catch (error) {
        res.status(401).send("error :",error.message)
    }
}

const proDetails =async(req,res)=>{
    const  { id} = req.query

    try {
         const Product = await productModel.findById(id);
         res.status(200).send(Product,{msg:"Okk"})
        
    } catch (error) {
         res.status(500).send( `error : ${error}`)
    }
}
const homeMenDisplay = async(req,res)=>{
    const { category} = req.query
    const Mens =  await productModel.find({category:'mens'})
    // console.log(Mens)
    res.status(200).send(Mens)
}
const homeWomenDisplay = async(req,res)=>{
    console.log(req.query)
    // res.send("okk")
    const { category} = req.query
    const Women =  await productModel.find({category:'womens'})
    // console.log(Women)
    res.status(200).send(Women)
}

const review = async(req,res)=>{
   try {
    const Review = await reviewModel.find()
    res.status(200).send({review:Review})
    
   } catch (error) {
    res.status(500).send({msg:"Not able to get"})
   }
}
module.exports ={
    homeDisplay,
    proDetails,
    homeMenDisplay,
    homeWomenDisplay,
    review
}