import db from "../config/config";
import Helper from "../utils/helpers/helpers";
import adminQueries from "../queries/admin.queries";
import super_queries from "../queries/super.queries";

const { fetchResourceByPage, calcPages } = Helper;

const { findAdminByEmail, findAdminByID } = adminQueries;

export default class SuperService {
  /**
   * get super admin by email
   * @memberof SuperService
   */
  static async findSuperByEmail(email) {
    return db.oneOrNone(super_queries.findSuperByEmail, [email]);
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
   * @memberof SuperService
   */
  static async createAdmin(data) {
    const { name, email } = data;
    return db.none(super_queries.createAdmin, [name, email]);
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
    return db.oneOrNone(super_queries.findUserByID, [id]);
  }

  /**
   * change user account status
   * @memberof SuperService
   */
  static async setUserStatus(data) {
    const { id, status } = data;
    return db.none(super_queries.setClientStatus, [status, id]);
  }

  /**
   * change admin account status
   * @memberof SuperService
   */
  static async setAdminStatus(data) {
    const { id, status } = data;
    return db.none(super_queries.setAdminStatus, [status, id]);
  }
}
