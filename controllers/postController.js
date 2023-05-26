const jwt = require("jsonwebtoken");
const {errorHandler} = require("../middleware/errorHandler");
const { queryExecuter }= require("../utils/connection");
const {responsefunc}= require("../helpers/response");
const createPost=async(req,res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const tag = req.body.tag;

            let sql="insert into post (user_id,title,description,tag) values (?,?,?,?)";
            let values=[req.user_id,title,description,tag];
            const[result]=await queryExecuter(sql,values);
            console.log(req.user_id);
            response = responsefunc(201, true, "inserted values", req.body, res);
            
            
    }catch(error){
        new errorHandler(401,false,error.message,{},res)

    }

};

const updatePost = async (req,res,next)=>{
    try{
        
        const post_id=req.body.post_id;
        const title=req.body.title;
        const description=req.body.description;
        const tag=req.body.tag;
        let sql=`update post set post_id=?,title=?,description=?,tag=? where post_id=?`;
        let values=[post_id,title,description,req.params.post_id];
        const [result] =await queryExecuter(sql,values);
    res.send({
        message : "post values updated",
        data:result
    });
    response = responsefunc(201, true, "updated values", req.body, res);
   } catch(error){
    new errorHandler(401,false,error.message,{},res);
   }
};

const deletePost = async (req,res)=>{
    try{
        let sql=`delete from post where post_id=?`;
        let values=req.params.post_id;
        const [result] =await queryExecuter(sql,values);
        res.send({
            message : "post values deleted",
            data:result
        });
        response = responsefunc(201, true, "deleted values", req.body, res);
        return
       } catch(error){
        new errorHandler(401,false,error.message,{},res);
       }
    };
    
    const getPostDetails = async(req,res)=>{
        try{
            let sql=`select * from post where post_id=? order by created_time`;
            let values=req.params.post_id;
            const [result] =await queryExecuter(sql,values);
            res.send({
                message : "post values fetched",
                data:result
            });
            response = responsefunc(201, true, "get details", req.body, res);
           } catch(error){
            new errorHandler(401,false,error.message,{},res);
           }
        };

    const getFilter = async(req,res)=>{
        try{
            // let data = {
            //     title : req.query.title,
            //     tag : req.query.tag
            // }
            // let sql= `select * from post where title like ? and tag like ? order by created_time`;
            // let values = [`%${data.title}%`,`%${data.tag}%`];
            // console.log(values);
            // const [result] =await queryExecuter(sql,values);
            // // console.log(result);
            // res.send({
            //     status : true,
            //     message : "Data",
            //     data : result
            // })
         if(req.body.title && req.body.tag){
            let sql=`select * from post where title like ? and tag like ? order by created_time`;
            let values=['%'+req.body.title+'%','%'+req.body.tag+'%'];
            const [result] =await queryExecuter(sql,values);
            response = responsefunc(201, true, "got details", result, res);
        }
        else if(req.body.title){
            let sql=`select * from post where title like ? order by created_time`;
            let values=['%'+req.body.title+'%'];
            const [result] =await queryExecuter(sql,values);
            response = responsefunc(201, true, "got details", result, res);
        }
        else{
            let sql=`select * from post where tag like ? order by created_time`;
            let values=['%'+req.body.tag+'%'];
            const [result] =await queryExecuter(sql,values);
            response = responsefunc(201, true, "got details", result, res);
        } 
        }
        catch(error){
            new errorHandler(401,false,error.message,{},res);
           } 
    }
    const getPage = async(req,res)=>{
        try{
            const v=1;
            const page=req.params.page;
            const start=(page-1)*v;
            let sql=`select * from post limit ${start},${v}`;
            const [result] =await queryExecuter(sql);
            response = responsefunc(201, true, "got details", result, res);
        }
        catch(error){
            new errorHandler(401,false,error.message,{},res);
           } 
    }
       
module.exports={createPost,updatePost,deletePost,getPostDetails,getFilter,getPage};