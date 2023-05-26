const express=require("express");
const userRoute=express.Router();

const {signUp,login,create}=require("../controllers/userController");
const {validateUser} = require("../middleware/validate");

userRoute.post("/signUp",validateUser, signUp,create);
userRoute.post("/login", login);
userRoute.post("/create",validateUser,create);


module.exports={userRoute};