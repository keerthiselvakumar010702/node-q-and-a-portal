const responsefunc = (statusCode, success, message, data, res) => {
    const response = {
      success,
      message,
      data,
    };
    res.status(statusCode).send(response);
  };
  
  module.exports = { responsefunc };