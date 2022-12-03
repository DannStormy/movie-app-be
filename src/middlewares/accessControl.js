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
    if (role !== "user") {
      return res.status(403).send({ message: "Access denied" });
    }
    next();
  }
  /**
   * admin/superadmin middleware guard.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof accessControl Middleware
   */
  static isBiUser(req, res, next) {
    const { role } = req.data;
    if (role !== "admin" && role !== "super") {
      return res.status(403).send({ message: "Access denied" });
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
    if (role !== "admin")
      return res.status(403).send({ message: "Access denied" });
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
    console.log(req.data)
    if (role !== 1)
      return res.status(403).send({ message: "Access denied" });
    next();
  }
}

export default AccessControlMiddleware;
