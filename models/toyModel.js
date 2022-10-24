const mongoose = require("mongoose");
const Joi = require("joi");

const toySchema = new mongoose.Schema({
    name: String,
    info: String,
    price: Number,
    cat: String,
    img: String,
    date: {
        type: Date,
        default: Date.now()
    },
    user_id: String

})

exports.ToyModel = mongoose.model("toys", toySchema);

exports.validateToy = (_reqBody) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        description: Joi.string().min(2).max(99).required(),
        price: Joi.number().min(1).max(1000000).required(),
        cat: Joi.string().min(2).max(99).required(),
        img: Joi.string().min(2).max(99).allow(null, "")
    })
    return schemaJoi.validate(_reqBody)
}