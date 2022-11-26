/**
 * A collection of middleware methods used for access control
 * of requests through protected routes.
 *
 * @class AccessControlMiddleware
 */
class AccessControlMiddleware {
  /**
   * client middleware guard.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof accessControl Middleware
   */
  static isTriUser(req, res, next) {
    const { role } = req.data;
    if (role !== "user" && "admin" && "super")
      return res.status(403).send({ message: "Access denied" });
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
    if (role !== "super")
      return res.status(403).send({ message: "Access denied" });
    next();
  }
}

export default AccessControlMiddleware;