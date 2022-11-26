import db from "../config/config";
import Helper from "../utils/helpers/helpers";
import user_queries from "../queries/user.queries";

const { registerUser, findUserByEmail } = user_queries;

export default class UserService {
  /**
   * register new user
   * @memberof UserService
   */
  static async addUser(data) {
    let { firstName, lastName, email, password } = data;
    password = await Helper.generatePasswordHash(password);
    return db.none(registerUser, [firstName, lastName, email, password]);
  }

  /**
   * get user by email
   * @memberof UserService
   */
  static async getUserByEmail(email) {
    return db.oneOrNone(findUserByEmail, [email]);
  }
}
