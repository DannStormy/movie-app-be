import db from "../config/config";
import Helper from "../utils/helpers/helpers";
import user_queries from "../queries/user.queries";

const {
  registerUser,
  findUserByEmail,
  addClientStatus,
  checkClientStatus,
  updatePassword,
} = user_queries;

export default class UserService {
  /**
   * register new user
   * @memberof UserService
   */
  static async addUser(data) {
    let { firstName, lastName, email, password } = data;
    password = await Helper.generatePasswordHash(password);
    return db.one(registerUser, [firstName, lastName, email, password]);
  }

  /**
   * register user status
   * @memberof UserService
   */
  static async addStatus(id, status = true) {
    return db.none(addClientStatus, [id, status]);
  }

  /**
   * get user by email
   * @memberof UserService
   */
  static async getUserByEmail(email) {
    return db.oneOrNone(findUserByEmail, [email]);
  }

  /**
   * check client account status
   * @memberof UserService
   */
  static async fetchClientStatus(id) {
    return db.oneOrNone(checkClientStatus, [id]);
  }

  /**
   * update client password
   * @memberof UserService
   */
  static async updatePassword(params, body) {
    const { id } = params;
    const { password } = body;
    return db.oneOrNone(updatePassword, [password, id]);
  }
}
