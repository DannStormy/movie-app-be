import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";

const { getUserByEmail } = UserService;

export default class UserMiddleware {
 /**
   * validates post request body
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns the details
   */
  static validate(schema) {
    return async (req, res, next) => {
      try {
        await Helper.validateInput(schema, req.body);
        next();
      } catch (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    };
  }

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
      const user = await getUserByEmail(email);
      if (user) {
        return res
          .status(409)
          .json({ status: "conflict", message: "user exists" });
      }
      return next();
    } catch (error) {
      console.log(error);
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
        return res
          .status(400)
          .json({ status: "bad request", message: "user does not exist" });
      }
      const passwordMatch = await Helper.comparePasswordHash(
        password,
        user.password
      );
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ status: "bad request", message: "wrong password" });
      }
      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * Checks for token in the authorization and x-access-token header properties.
   * @static
   * @private
   * @param {object} authorization - The headers object
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkAuthorizationToken(authorization) {
    let bearerToken = null;
    if (authorization) {
      const token = authorization.split(" ")[1];
      bearerToken = token || authorization;
    }
    return bearerToken;
  }
  /**
   * Aggregates a search for the access token in a number of places.
   * @static
   * @private
   * @param {Request} req - The express request object.
   * @memberof UserMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkToken(req) {
    const {
      headers: { authorization },
    } = req;
    const bearerToken = UserMiddleware.checkAuthorizationToken(authorization);
    return req.body.refreshToken
      ? req.body.refreshToken
      : bearerToken ||
          req.headers["x-access-token"] ||
          req.headers.token ||
          req.body.token;
  }

  /**
   * Verifies the validity of a user's access token or and the presence of it.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static authenticate(req, res, next) {
    const token = UserMiddleware.checkToken(req);
    if (!token) {
      return res.json({
        message: 'Token required'
      })
    }
    try {
      const decoded = req.body.refreshToken
        ? Helper.verifyToken(token, process.env.REFRESH_SECRET)
        : Helper.verifyToken(token, process.env.JWT_SECRET_KEY);
      req.data = decoded;
      next();
    } catch (err) {
        console.log(err)
        return err
    }
  }
}
