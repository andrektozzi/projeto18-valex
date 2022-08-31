import joi from 'joi';

const activationSchema = joi.object({
    cvc: joi.string().required(),
    password: joi.string().min(4).max(4).pattern(/^[0-9]+$/).required()
});

export default activationSchema;