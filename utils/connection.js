const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config()
const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });
  con.connect( function(err){
    if(err){
      console.log("error while connecting");
    }else{
      console.log("connection established");
    }
  })
  
  const queryExecuter =  (sql, value) => {
    if (value === 0) {
      return  con.promise().query(sql);
    }
  
    return con.promise().query(sql, value);
  };

  module.exports={con,queryExecuter}