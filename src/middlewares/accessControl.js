import UserService from "../services/user.service";

const { fetchClientStatus } = UserService;
/**
 * A collection of middleware methods used for access control
 * of requests through protected routes.
 *
 * @class AccessControlMiddleware
 */
class AccessControlMiddleware {
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
    if (role !== "super")
      return res.status(403).send({ message: "Access denied" });
    next();
  }

  /**
   * Accout active? middleware guard.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof accessControl Middleware
   */
  static async isActive(req, res, next) {
    const { userId, role } = req.data;
    if (role === "user") {
      const { status } = await fetchClientStatus(userId);
      if (!status)
        return res
          .status(403)
          .send({ message: "Account Deactivated, can't perform action" });
    }
    next();
  }
}

export default AccessControlMiddleware;
