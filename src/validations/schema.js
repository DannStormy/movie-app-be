import Joi from "joi";

import ValidationHelper from "../utils/helpers/validations";

const {
  emailCheck,
  passwordCheck,
  stringCheck,
  numberCheck,
  ratingNumberCheck,
} = ValidationHelper;

export default {
  registerSchema: Joi.object({
    firstName: stringCheck("firstName"),
    lastName: stringCheck("lastName"),
    email: emailCheck(),
    password: passwordCheck(),
  }),

  checkEmailSchema: Joi.object({
    email: emailCheck(),
  }),

  passwordReset: Joi.object({
    password: passwordCheck(),
    resetPasswordToken: stringCheck("resetPasswordToken"),
  }),

  loginSchema: Joi.object({
    email: emailCheck(),
    password: passwordCheck(),
  }),

  createAdminSchema: Joi.object({
    name: stringCheck("name"),
    role_id: numberCheck("role_id"),
    email: emailCheck(),
  }),

  addMovieSchema: Joi.object({
    title: stringCheck("title"),
    genre: stringCheck("genre"),
    year: numberCheck(),
  }),

  changeStatusSchema: Joi.object({
    status: Joi.boolean(),
  }),

  editTitleSchema: Joi.object({
    title: stringCheck("Title"),
  }),

  ratingSchema: Joi.object({
    rating: ratingNumberCheck("Rating"),
    review: Joi.optional(),
  }),

  editRatingSchema: Joi.object({
    rating: Joi.optional(),
    review: Joi.optional(),
  }),

  editReviewSchema: Joi.object({
    review: stringCheck("Review"),
  }),
};
