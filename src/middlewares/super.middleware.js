import SuperService from "../services/super.service";

const { findSuperByEmail, findAdminByEmail } = SuperService;

export default class SuperMiddleware {
  /**
   * find superadmin in super table
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
  static async checkDetails(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await findSuperByEmail(email);
      if (!user) {
        return res
          .status(400)
          .json({ status: "bad request", message: "user does not exist" });
      }
      if (password !== user.password) {
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
   * Checks if admin exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async checkAdminExists(req, res, next) {
    try {
      const { email } = req.body;
      const user = await findAdminByEmail(email);
      if (user) {
        return res
          .status(409)
          .json({ status: "conflict", message: "admin exists" });
      }
      return next();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
