const jwt = require("jsonwebtoken");
const {errorHandler} = require("../middleware/errorHandler");
const { queryExecuter }= require("../utils/connection");
const {responsefunc}= require("../helpers/response");
const createAnswer=async(req,res)=>{
    try{
        const answer = req.body.answer;
        const post_id=req.body.post_id;
        

            let sql="insert into answer (user_id,post_id,answer) values (?,?,?)";
            let values=[req.user_id,post_id,answer];
            const[result]=await queryExecuter(sql,values);
            console.log(req.user_id);
        //    response = responsefunc(201, true, "inserted values", req.body, res);
            
            
    }catch(error){
        new errorHandler(401,false,error.message,{},res)

    }

};

const getAnswer = async (req, res) => {
    try {
      let title = req.query.title;
      let sql = `select post_id from post where title = ?`;
      let value = [title];
      const [result] = await queryExecuter(sql, value);
      let post_id = result[0].post_id;
      let fields = Object.keys(req.query)[1];
      let sql1 = `select ${fields} from answer where post_id=? order by created_time`;
      let value1 = post_id;
      const [result1] = await queryExecuter(sql1, value1);
      console.log(result1);
      response = responsefunc(200, true, "list of all answers", result1, res);

    } catch (error) {
      res.send(error);
      console.log(error);
    }
  };
module.exports={createAnswer,getAnswer};