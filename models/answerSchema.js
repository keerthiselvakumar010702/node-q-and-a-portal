const joi=require("joi");

const answerSchema=joi.object({
    post_id:joi.number().required(),
    answer:joi.string().required()
})

module.exports={answerSchema}

