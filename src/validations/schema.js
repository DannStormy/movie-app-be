import Joi from "joi";

import ValidationHelper from "../utils/helpers/validations";

const { emailCheck, passwordCheck, stringCheck, numberCheck } =
  ValidationHelper;

export default {
  registerSchema: Joi.object({
    firstName: stringCheck("firstName"),
    lastName: stringCheck("lastName"),
    email: emailCheck(),
    password: passwordCheck(),
  }),
  loginSchema: Joi.object({
    email: emailCheck(),
    password: passwordCheck(),
  }),
  createAdminSchema: Joi.object({
    name: stringCheck(),
    email: emailCheck(),
  }),
  addMovieSchema: Joi.object({
    title: stringCheck(),
    genre: stringCheck(),
    year: numberCheck(),
  }),
};
