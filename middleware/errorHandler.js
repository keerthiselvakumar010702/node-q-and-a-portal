const { responsefunc } = require("../helpers/response");

class errorHandler extends Error {
  constructor(statusCode, success, message, data, res) {
    super(message)
    responsefunc(statusCode, success, message, data, res);
  }
}

module.exports={errorHandler};