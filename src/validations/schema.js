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
    name: stringCheck("name"),
    email: emailCheck(),
  }),
  addMovieSchema: Joi.object({
    title: stringCheck("title"),
    genre: stringCheck("genre"),
    year: numberCheck(),
  }),
  changeStatusSchema: Joi.object({
    id: numberCheck(),
    status: Joi.boolean(),
  }),
};
