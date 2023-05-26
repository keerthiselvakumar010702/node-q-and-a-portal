const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const { queryExecuter }= require("../utils/connection");

const signUp=async(req,res,next)=>{
    const {user_id,username,email,password}=req.body;
    const newUser={
     user_id,
     username,
     email,
     password
    };
 
    try{
     let sql=`select * from user where user_id=?`;
     let values=req.body.user_id;
     const [result]=await queryExecuter(sql,values);
     console.log(result);
 
     if(result.length!=0){
         res.send({
             message : "User already exists! Try login",
             data:result,
         });
     }else{
         res.send({
             message:"New user",
         });
         next();
         console.log("user created");
     }
    
    }catch(error){
     new errorHandler(401,false,error.message,{},res);
    }
 };
 const create=async(req,res)=>{
    try{
        const user_id = req.body.user_id;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        

        bcrypt.hash(password,10,async(err,hash)=>{
            let sql="insert into user (user_id,username,email,password) values (?,?,?,?)";
            let values=[user_id,username,email,hash];
            const[result]=await queryExecuter(sql,values);
          //  res.send(result);
        });
    }catch(error){
        new errorHandler(401,false,error.message,{},res)
    }

};
const login=async (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    const newUser={
        email,
        password
    };
    let token;
    try{
        if(email && password){
            token = jwt.sign(
                { password: password , email: email },
                "secretkey",
                { expiresIn: "24h" }
              );
            console.log(token);
        }else{
            res.send({
                message:"details not provided"
              })
        }
    }catch(error){
        new errorHandler(401,false,error.message,{},res)
    }
    res.status(201).json({
        success:true,
        data:{email:newUser.email,password:newUser.password,token:token},
    });
}
 module.exports={signUp,create,login};