import Joi from "joi";

import ValidationHelper from "../utils/helpers/validations";

const { emailCheck, passwordCheck, stringCheck } = ValidationHelper;

export default {
  registerSchema: Joi.object({
    firstName: stringCheck('firstName'),
    lastName: stringCheck('lastName'),
    email: emailCheck(),
    password: passwordCheck()
  }),
  loginSchema: Joi.object({
    email: emailCheck(),
    password: passwordCheck()
  })
}