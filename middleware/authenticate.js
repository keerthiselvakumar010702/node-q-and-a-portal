const jwt = require("jsonwebtoken");
const express=require("express");
const {con} = require("../utils/connection");
const {responsefunc}= require("../helpers/response");

  const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const decode = jwt.verify(token, "secretkey");
      let sql = `select user_id from user where email =?`;
      let values = decode.email;
      const [result] = await con.promise().query(sql, values);
      req.user_id = result[0].user_id;
      console.log(req.user_id);
      next();
    } else {
      response = responsefunc(401, false, "access denied",  {}, res);
    }
  };

  module.exports={auth};