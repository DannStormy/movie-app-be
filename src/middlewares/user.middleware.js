import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";

const { getUserByEmail } = UserService;

export default class UserMiddleware {
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
}
