import Joi from 'joi';

export const signupValidation = (req, res, next) => {
    const signUpSchema = Joi.object({
        name: Joi.string().min(4).max(15).required(),
        email: Joi.string().required(),
        password: Joi.string().min(4).max(12).required()
    })

    const { error } = signUpSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        })
    }
    next();
}

export const loginValidation = (req,res,next) => {
    const loginSchema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(12).required()
    })

    const {error} = loginSchema.validate(req.body)

    if(error){
       return res.status(400).json({
        success:false,
        message:error.details[0].message
       })
    }
    next();
}