const {userSchema}=require("../models/userSchema")
const {postSchema}=require("../models/postSchema")
const {answerSchema}=require("../models/answerSchema")
const validateUser= (req,res,next)=>{
    const result=userSchema.validate(req.body)
    if(result.error){
        console.log(result.error.details);
        res.send({
            message:"not validated",
            success : "false",
            data: result.error.details
        })
    }else{
        console.log(res.value);
        next();
    }
}
const validateUserPost= (req,res,next)=>{
    const result=postSchema.validate(req.body)
    if(result.error){
        console.log(result.error.details);
        res.send({
            message:"not validated",
            success : "false",
            data: result.error.details
        })
    }else{
        console.log(res.value);
        next();
    }
}
const validateUserAnswer= (req,res,next)=>{
    const result=answerSchema.validate(req.body)
    if(result.error){
        console.log(result.error.details);
        res.send({
            message:"not validated",
            success : "false",
            data: result.error.details
        })
    }else{
        console.log(res.value);
        next();
    }
}
module.exports = {validateUser,validateUserPost,validateUserAnswer };