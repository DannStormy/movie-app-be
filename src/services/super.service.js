import db from "../config/config";
import super_queries from "../queries/super.queries";

const {
  findSuperByEmail,
  findAdminByEmail,
  fetchAllUsers,
  createAdmin,
  findUserByID,
  findAdminByID,
  setClientStatus,
  setAdminStatus,
} = super_queries;

export default class SuperService {
  /**
   * get super admin by email
   * @memberof SuperService
   */
  static async findSuperByEmail(email) {
    return db.oneOrNone(findSuperByEmail, [email]);
  }

  /**
   * get admin by email
   * @memberof SuperService
   */
  static async findAdminByEmail(email) {
    return db.oneOrNone(findAdminByEmail, [email]);
  }

  /**
   * fetch all users
   * @memberof SuperService
   */
  static async fetchAllUsers() {
    return db.many(fetchAllUsers);
  }

  /**
   * create admin
   * @memberof SuperService
   */
  static async createAdmin(data) {
    const { name, email } = data;
    return db.none(createAdmin, [name, email]);
  }
  /**
   * fetch admin by id
   * @memberof SuperService
   */
  static async fetchAdmin(id) {
    return db.oneOrNone(findAdminByID, [id]);
  }

  /**
   * fetch user by id
   * @memberof SuperService
   */
  static async fetchUser(id) {
    return db.oneOrNone(findUserByID, [id]);
  }

  /**
   * change user account status
   * @memberof SuperService
   */
  static async setUserStatus(data) {
    const { id, status } = data;
    return db.none(setClientStatus, [status, id]);
  }

  /**
   * change admin account status
   * @memberof SuperService
   */
  static async setAdminStatus(data) {
    const { id, status } = data;
    return db.none(setAdminStatus, [status, id]);
  }
}
