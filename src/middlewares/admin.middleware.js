import Helper from "../utils/helpers/helpers";
import AdminService from "../services/admin.service";
import MovieService from "../services/movie.service";
import { Response, apiMessage } from "../utils/helpers/constants";

export default class AdminMiddleware {
  /**
   * find admin in admin table
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async checkDetails(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await AdminService.findAdminByEmail(email);

      if (!admin) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.INVALID_CREDENTIALS,
        });
      }

      const passwordMatch = Helper.comparePasswordHash(
        password,
        admin.password
      );

      if (!passwordMatch) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.PASSWORD_INCORRECT,
        });
      }

      const active = await Helper.isActive(admin.id, admin.role_id);

      if (!active) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: apiMessage.ACCOUNT_INACTIVE,
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
          message: apiMessage.RESOURCE_NOT_FOUND("admin"),
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
      const dbString = await AdminService.findAdminByEmail(req.params.email);

      if (!dbString.password_reset_string) {
        return Response.errorResponse(req, res, {
          status: 404,
          message: apiMessage.RESOURCE_NOT_FOUND("reset password string"),
        });
      }

      if (dbString.password_reset_string != req.params.resetString) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.AUTH_REQUIRED,
        });
      }

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
