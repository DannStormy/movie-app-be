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

  static async checkUserExists(req, res, next) {
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
   * find user in users table
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async checkUserDetails(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);

      if (!user) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.INVALID_CREDENTIALS,
        });
      }

      const passwordMatch = Helper.comparePasswordHash(password, user.password);

      if (!passwordMatch) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.PASSWORD_INCORRECT,
        });
      }

      const active = await Helper.isActive(user.id, user.role_id);

      if (!active) {
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
   * check if user has rated a particular movie
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async hasRated(req, res, next) {
    try {
      const rating = await MovieService.getMovieRating(req.params.movieId, req.data.userId);

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
   * checks reset password string
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async checkResetPasswordString(req, res, next) {
    try {
      const dbString = await UserService.getUserByEmail(req.params.email);

      if (!dbString.password_reset_string) {
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("reset password string"),
        });
      }

      if (dbString.password_reset_string != req.params.resetString) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: "reset string's don't match",
        });
      }
      
      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
