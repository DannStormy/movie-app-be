import _ from "lodash";
import { userDetails } from "../utils/helpers/constants/constants";
import Helper from "../utils/helpers/helpers";
import AdminService from "../services/admin.service";
import MovieService from "../services/movie.service";
import { Response, apiMessage } from "../utils/helpers/constants";

export default class AdminMiddleware {
  /**
   * Checks if admin does not exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async emailDoesNotExist(req, res, next) {
    try {
      const { email } = req.body;
      const admin = await AdminService.findAdminByEmail(
        email.trim().toLowerCase()
      );

      if (!admin) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: "Invalid credentials",
        });
      }

      req.user = admin;
      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * compare admin passwords
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async validateAdminPassword(req, res, next) {
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
   * check if admin account is active
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async validateAdminActive(req, res, next) {
    try {
      const { user } = req;

      if (!user.status) {
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
   * Checks if admin exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async checkAdminExists(req, res, next) {
    try {
      let { email } = req.body;
      email = email.trim().toLowerCase();

      const user = await AdminService.findAdminByEmail(email);

      if (user) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: apiMessage.RESOURCE_ALREADY_EXISTS("admin"),
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * checks admin account role and presence
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async checkAdminAccount(req, res, next) {
    try {
      const admin = await AdminService.fetchAdmin(req.params.adminId);

      if (!admin)
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("admin"),
        });

      if (admin.role_id === 1) {
        return Response.errorResponse(req, res, {
          status: 403,
          message: apiMessage.ROLE_NOT_SUFFICIENT,
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
  /**
   * checks user account presence
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async checkUserAccount(req, res, next) {
    try {
      const user = await AdminService.fetchUser(req.params.userId);

      if (!user) {
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("user"),
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

  static async validateResetPasswordToken(req, res, next) {
    try {
      const { resetPasswordToken } = req.body;

      const admin = await AdminService.fetchPasswordToken(resetPasswordToken);
      const data = _.pick(admin, userDetails);

      if (!admin) {
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("reset password string"),
        });
      }

      if (Helper.validateTokenExpiry(admin.password_reset_expire)) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: "password reset token expired",
        });
      }

      if (admin.password_reset_string !== resetPasswordToken) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.AUTH_REQUIRED,
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
   * looks for movie instance in db and returns if movie not found
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async checkIfMovieExists(req, res, next) {
    try {
      const movieExists = await MovieService.getMovieByID(req.params.movieId);

      if (!movieExists)
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("movie"),
        });

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
