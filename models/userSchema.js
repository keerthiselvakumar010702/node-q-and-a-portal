const Joi = require('joi')

const userSchema = Joi.object({
    user_id:Joi.number().required(),
    username:Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()  
});

module.exports={userSchema};