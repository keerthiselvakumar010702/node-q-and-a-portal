const joi=require("joi");

const postSchema=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    tag:joi.string().required()
})

module.exports={postSchema}

