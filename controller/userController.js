const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")
const OrderModel = require("../model/orderModel")
const reviewModel = require("../model/revirewModel");
const { review } = require("./productController");
const signup = async (req, res) => {
  const { name, email, city, address, pincode, password, age } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ msg: "Email ID already registered" }); // ✅ Add return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name:name,
      email:email,
      city:city,
      address:address,
      pincode:pincode,
      password: hashedPassword,
      age:age,
    });

    await newUser.save();
    return res.status(201).send({ msg: "Successfully registered" }); // ✅ Also return here
  } catch (error) {
    return res.status(500).send({ msg: "Server error", error: error.message }); // ✅ Consistent return
  }
};
const userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const User = await userModel.findOne({ email: email });
      // console.log(User);
  
      if (!User) {
        return res.status(401).send({ msg: "Invalid Email Id" });
      }
  
      const compare = await bcrypt.compare(password, User.password);
      // console.log(compare);
  
      if (!compare) {
        return res.status(401).send({ msg: "Invalid password" });
      }
  
      const Token = JWT.sign(
        { id: User._id },
        process.env.SECRETE,
        { expiresIn: "7d" }
      );
      console.log(Token);
  
      return res.status(200).send({
        Token: Token,
        msg: "Successfully Logged In",
        user: User,
      });
  
      // ❌ Don't put res.send after this
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Server Error", error: error.message });
    }
  };
  
const userCheckout = async(req,res)=>{
  

        try {
            const Token = req.header("auth-token");
    
            const verify = JWT.verify(Token,process.env.SECRETE)
           
            const user = await userModel.findById(verify.id).select("-password") // select is used where we can exclude or include any other just like i exclude passward it means user 
            res.status(200).send(user,{msg:"Done"})
        
            
        } catch (error) {
            res.status(500).send({msg:"Authentication required"})
        }
    
}
const userGet = async(req,res)=>{
   try {
    const user = await userModel.findById(req.query.userid).select("-password");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
    console.log(user)
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }

}

const returnPro = async (req, res) => {
  const { id } = req.query;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id, // ✅ Correct: pass ID directly
      { taskstatus: false }, // ✅ The update you want to apply
      { new: true } // ✅ Optional: returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    return res.status(200).json({ msg: "Task status changed successfully", updatedOrder });
  } catch (error) {
    console.error("Update failed", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const userReview = async (req, res) => {
  const { orderId, productid, review, rating, userName } = req.body;

  try {
    const newReview = await reviewModel.create({
      orderId,
      productid,
      review,
      rating,
      userName,
    });

    res.status(201).send({ review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).send({ msg: "Server error while creating review" });
  }
};

const getUserReview = async(req,res)=>{
      const getReview = await reviewModel.find();
      res.send({msg:"reviews",review:getReview})
}
const order = async(req,res)=>{
  const{ email } = req.query
  const userOrder = await OrderModel.findOne({email:email})
  console.log(userOrder)
  res.send(userOrder)
}
module.exports = {
     signup ,
     userLogin,
     userCheckout,
     userGet,
     returnPro,
     userReview,
     getUserReview,
     order
    };
