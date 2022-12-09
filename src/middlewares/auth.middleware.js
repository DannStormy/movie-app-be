import Helper from "../utils/helpers/helpers";
import { Response, apiMessage } from "../utils/helpers/constants";

export default class AuthMiddleware {
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
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkToken(req) {
    const {
      headers: { authorization },
    } = req; 
    const bearerToken = AuthMiddleware.checkAuthorizationToken(authorization);

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
   * @memberof AuthMiddleware
   *
   */
  static async authenticate(req, res, next) {
    const token = AuthMiddleware.checkToken(req);

    if (!token) {
      return Response.errorResponse(req, res, {
        status: 422,
        message: apiMessage.TOKEN_ERROR,
      });
    }

    try {
      const decoded = req.body.refreshToken
        ? Helper.verifyToken(token, process.env.REFRESH_SECRET)
        : Helper.verifyToken(token, process.env.JWT_SECRET_KEY);

      req.data = decoded;
      
      const active = await Helper.isActive(req.data.userId, req.data.role);

      if (active === false) {
        return Response.errorResponse(req, res, {
          status: 401,
          message: apiMessage.ACCOUNT_INACTIVE,
        });
      }
      
      next();
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: err.message });
    }
  }
}
