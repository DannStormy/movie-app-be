import Helper from "../utils/helpers/helpers";
import AdminService from "../services/admin.service";

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
        return res
          .status(400)
          .json({ status: "bad request", message: "user does not exist" });
      }
      if (password !== admin.password) {
        return res
          .status(400)
          .json({ status: "bad request", message: "wrong password" });
      }
      const active = await Helper.isActive(admin.id, admin.role_id);
      if (!active)
        return res.status(401).json({ message: "Account Deactivated" });
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
        return res
          .status(409)
          .json({ status: "conflict", message: "admin exists" });
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
        return res.status(400).json({
          message: `Admin account with id:${req.params.adminId} not found`,
        });
      if (admin.role_id === 1) {
        return res
          .status(400)
          .json({ message: `Super Admin can't be deactivated` });
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
      if (!user)
        return res.status(400).json({
          message: `User account with id:${req.params.userId} not found`,
        });
      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
