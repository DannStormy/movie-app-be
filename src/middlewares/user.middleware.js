import _ from "lodash";
import { userDetails } from "../utils/helpers/constants/constants";
import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import { Response, apiMessage } from "../utils/helpers/constants";
import MovieService from "../services/movie.service";

const { getUserByEmail } = UserService;

export default class UserMiddleware {
  /**
   * Checks if user exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async emailExists(req, res, next) {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email.trim().toLowerCase());

      if (user) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: apiMessage.RESOURCE_ALREADY_EXISTS("user"),
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * Checks if user does not exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async emailDoesNotExist(req, res, next) {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email.trim().toLowerCase());

      if (!user) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: "invalid credentials",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * compare user passwords
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async validateUserPassword(req, res, next) {
    try {
      const { user, body } = req;
      const passwordMatch = await Helper.comparePasswordHash(
        body.password,
        user.password
      );

      if (!passwordMatch) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.PASSWORD_INCORRECT,
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * check if user account is active
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async validateUserActive(req, res, next) {
    try {
      const { user } = req;

      if (!user.is_active) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: apiMessage.ACCOUNT_INACTIVE,
        });
      }

      req.user = user;

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * check if user email is verified
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async validateUserEmail(req, res, next) {
    try {
      const { user } = req;

      if (!user.isemailverified) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: "yet to verify email",
        });
      }

      req.user = user;

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * check if user has rated a particular movie
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async hasRated(req, res, next) {
    try {
      const {
        params: { movieId },
        data: { userId },
      } = req;

      const rating = await MovieService.findUserMovieRating(movieId, userId);

      if (rating) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: apiMessage.RESOURCE_ALREADY_EXISTS("rating"),
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * checks reset password token
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async validateResetPasswordToken(req, res, next) {
    try {
      const { resetPasswordToken } = req.body;
      const user = await UserService.fetchPasswordToken(resetPasswordToken);
      const data = _.pick(user, userDetails);

      if (!user) {
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("reset password token"),
        });
      }

      if (Helper.validateTokenExpiry(user.password_reset_expire)) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: "password reset token expired",
        });
      }

      if (user.password_reset_string !== resetPasswordToken) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: "reset token error",
        });
      }

      req.user = data;

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * checks email verification token
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async validateEmailVerificationToken(req, res, next) {
    try {
      const { emailToken } = req.body;
      const user = await UserService.fetchEmailVerificationToken(emailToken);

      if (!user) {
        return Response.errorResponse(req, res, {
          status: 404,
          message: "email verification token not found",
        });
      }

      const { email, email_verification_expire } = user;

      if (Helper.validateTokenExpiry(email_verification_expire)) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: "email verification token expired",
        });
      }
      req.email = email;

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
