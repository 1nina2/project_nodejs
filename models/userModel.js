const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "regular"
    },

    date_created: {
        type: Date,
        default: Date.now()
    }
})

exports.UserModel = mongoose.model("users", userSchema);

//A function that produces a token
exports.createToken = (user_id) => {


    let token = jwt.sign({ _id: user_id }, config.tokenSecret, { expiresIn: "60mins" })
    return token;
}


exports.validUser = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required()
    })

    return joiSchema.validate(_reqBody);
}

exports.validLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required()
    })

    return joiSchema.validate(_reqBody);
}