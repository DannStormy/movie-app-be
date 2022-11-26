import db from "../config/config";
import super_queries from "../queries/super.queries";

const { findSuperByEmail, fetchAllUsers } = super_queries;

export default class SuperService {
  /**
   * get super admin by email
   * @memberof SuperService
   */
  static async findSuperByEmail(email) {
    return db.oneOrNone(findSuperByEmail, [email]);
  }

  /**
   * fetch all users
   * @memberof SuperService
   */
  static async fetchAllUsers() {
    return db.many(fetchAllUsers);
  }
}
