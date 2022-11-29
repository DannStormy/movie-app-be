import SuperService from "../services/super.service";

const { findAdminByEmail } = SuperService;

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
      const admin = await findAdminByEmail(email);
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
      req.user = admin;
      return next();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
