const express=require("express");
const postRoute=express.Router();


const {createPost,updatePost,deletePost, getPostDetails,getFilter,getPage}=require("../controllers/postController");
const {validateUser,validateUserPost} = require("../middleware/validate");
const {auth}=require("../middleware/authenticate");

postRoute.post("/create",validateUserPost,auth,createPost);
postRoute.put("/update",validateUser,updatePost);
postRoute.delete("/delete/:post_id",auth,deletePost);
postRoute.get("/get/:post_id",getPostDetails);
postRoute.get("/filter",getFilter);
postRoute.get("/search/:page",getPage);

module.exports={postRoute};