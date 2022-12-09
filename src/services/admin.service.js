import db from "../config/db/config";
import Helper from "../utils/helpers/helpers";
import adminQueries from "../queries/admin.queries";
import super_queries from "../queries/super.queries";

const { fetchResourceByPage, calcPages } = Helper;

const { findAdminByEmail, findAdminByID } = adminQueries;

export default class AdminService {
  /**
   * get super admin by email
   * @memberof AdminService
   */
  static async findSuperByEmail(email) {
    return db.oneOrNone(super_queries.findSuperByEmail, [email]);
  }

  /**
   * get admin by email
   * @memberof AdminService
   */
  static async findAdminByEmail(email) {
    return db.oneOrNone(findAdminByEmail, [email]);
  }

  /**
   * fetch all users
   * @memberof AdminService
   */
  static async fetchAllUsers({ page = 1, limit = 10 }) {
    const [total, result] = await fetchResourceByPage({
      page,
      limit,
      getCount: super_queries.fetchUsersCount, //query to count all movies
      getResources: super_queries.fetchAllUsers, //query to get all the movies
    });
    return {
      total: +total.count,
      currentPage: +page,
      totalPages: calcPages(total.count, limit),
      result,
    };
  }

  /**
   * create admin
   * @memberof AdminService
   */
  static async createAdmin(data) {
    let { name, email, role_id } = data;
    email = email.trim().toLowerCase();
    return db.oneOrNone(super_queries.createAdmin, [name, email, role_id]);
  }
  /**
   * fetch admin by id
   * @memberof AdminService
   */
  static async fetchAdmin(id) {
    return db.oneOrNone(findAdminByID, [id]);
  }

  /**
   * fetch user by id
   * @memberof AdminService
   */
  static async fetchUser(id) {
    return db.oneOrNone(super_queries.findUserByID, [id]);
  }

  /**
   * change user account status
   * @memberof AdminService
   */
  static async setUserStatus(status, id) {
    return db.none(super_queries.setClientStatus, [status, id]);
  }

  /**
   * change admin account status
   * @memberof AdminService
   */
  static async setAdminStatus(status, id) {
    return db.none(super_queries.setAdminStatus, [status, id]);
  }

  /**
   *  admin reset password
   * @memberof AdminService
   */
  static async adminResetPassword(password, email) {
    password = Helper.generatePasswordHash(password);
    return db.none(adminQueries.adminResetPassword, [password, email]);
  }
  /**
   *  set password reset string
   * @memberof AdminService
   */
  static async passwordResetString(string, adminId) {
    return db.none(adminQueries.updatePasswordResetString, [string, adminId]);
  }
}
