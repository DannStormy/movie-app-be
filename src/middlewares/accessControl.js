import { Response, apiMessage } from "../utils/helpers/constants";
/**
 * A collection of middleware methods used for access control
 * of requests through protected routes.
 *
 * @class AccessControlMiddleware
 */
class AccessControlMiddleware {
  /**
   * user middleware guard.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof accessControl Middleware
   */
  static isUser(req, res, next) {
    const { role } = req.data;

    if (role !== 3) {
      return Response.errorResponse(req, res, {
        status: 403,
        message: apiMessage.ROLE_NOT_SUFFICIENT,
      });
    }
    next();
  }

  /**
   * Admin middleware guard.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof accessControl Middleware
   */
  static isAdmin(req, res, next) {
    const { role } = req.data;

    if (role === 3) {
      return Response.errorResponse(req, res, {
        status: 403,
        message: apiMessage.ROLE_NOT_SUFFICIENT,
      });
    }
    next();
  }

  /**
   * Super Admin middleware guard.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof accessControl Middleware
   */
  static isSuper(req, res, next) {
    const { role } = req.data;
    
    if (role !== 1) {
      return Response.errorResponse(req, res, {
        status: 403,
        message: apiMessage.ROLE_NOT_SUFFICIENT,
      });
    }
    next();
  }
}

export default AccessControlMiddleware;
