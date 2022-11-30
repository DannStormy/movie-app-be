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
  resetPasswordSchema: Joi.object({
    email: emailCheck(),
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
  reviewMovieSchema: Joi.object({
    movie_id: numberCheck("MovieID"),
    userId: numberCheck("UserID"),
    review: stringCheck("Review"),
  }),
  editTitleSchema: Joi.object({
    title: stringCheck("Title"),
  }),
  editRatingSchema: Joi.object({
    rating: numberCheck("Rating"),
  }),
  editReviewSchema: Joi.object({
    review: stringCheck("Review"),
  }),
};
