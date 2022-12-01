import Joi from "joi";

/**
 * contains validation helpers
 *
 * @class ValidationHelper
 */
export default class ValidationHelper {
  /**
   * validates emails
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static emailCheck() {
    return Joi.string().email().lowercase().required().messages({
      "any.required": "Email is a required field",
      "string.email": "Email is not valid",
      "string.empty": "Email cannot be an empty field",
    });
  }

  /**
   * validates passwords
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static passwordCheck() {
    return Joi.string().trim().required().min(5).messages({
      "string.base": "Password must be a string",
      "string.empty": "Password field cannot be empty",
      "any.required": "Password field is required",
      "string.min": "Password cannot be less than 7 characters",
    });
  }

  /**
   * validates strings
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static stringCheck(param, min = 1, max = 120) {
    return Joi.string()
      .required()
      .trim()
      .min(min)
      .max(max)
      .messages({
        "any.required": `${param} is a required field`,
        "string.max": `${param} can not be greater than ${max} characters`,
        "string.min": `${param} can not be lesser than ${min} characters`,
        "string.base": `${param} must be a string`,
        "string.empty": `${param} cannot be an empty field`,
      });
  }
  /**
   * validates numbers
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static numberCheck(param) {
    return Joi.number()
      .required()
      .messages({
        "any.required": `${param} is a required field`,
        "number.base": `${param} must be a number`,
        "number.empty": `${param} cannot be an empty field`,
      });
  }

    /**
   * It validates a number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
     static ratingNumberCheck(param, min = 0, max = 10) {
      return Joi
        .number()
        .required()
        .min(min)
        .messages({
          'any.required': `${param} is a required field`,
          'number.base': `${param} must be a number`,
          'number.empty': `${param} cannot be an empty field`,
          'number.min': `${param} can not be lesser than ${min}`,
          'number.max': `${param} can not be more than ${max}`
        });
    }
  
}
