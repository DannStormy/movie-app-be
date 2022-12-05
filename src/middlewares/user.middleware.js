import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import { Response, apiMessage } from "../utils/helpers/constants";

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
      console.log(req.body);
      const user = await getUserByEmail(email.trim().toLowerCase());
      if (user) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: apiMessage.RESOURCE_ALREADY_EXISTS("admin"),
        });
      }
      return next();
    } catch (error) {
      logger.log(error);
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
      console.log(error);
      return error;
    }
  }
}
