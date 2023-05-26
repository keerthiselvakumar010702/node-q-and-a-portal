
const express=require("express");
const answerRoute=express.Router();

const {createAnswer,getAnswer}=require("../controllers/answerController");
const {auth}=require("../middleware/authenticate");
const {validateUserAnswer} = require("../middleware/validate");

answerRoute.post("/create",validateUserAnswer,auth,createAnswer);
answerRoute.get("/get",getAnswer);

module.exports={answerRoute};