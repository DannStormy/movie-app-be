import Joi from "joi";

export default {
  registerSchema: Joi.object({
    firstName: Joi.string()
      .min(1)
      .required(),
    lastName: Joi.string()
      .min(1)
      .required(),
    email: Joi.string()
      .email()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  }),
  loginSchema: Joi.object({
    email: Joi.string()
      .email()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  })
}