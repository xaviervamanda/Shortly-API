import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email({ tlds: { allow: false } }).trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.any().equal(joi.ref("password")).required()
});

export const signInSchema = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).trim().required(),
    password: joi.string().trim().required()
});