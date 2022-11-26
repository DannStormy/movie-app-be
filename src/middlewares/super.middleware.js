import SuperService from "../services/super.service";

const { findSuperByEmail } = SuperService;

export default class SuperMiddleware {
  /**
   * find user in users table
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
}
