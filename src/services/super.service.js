import db from "../config/config";
import super_queries from "../queries/super.queries";

const {
  findSuperByEmail,
  findAdminByEmail,
  fetchAllUsers,
  createAdmin,
  addMovie,
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
   * add movie
   * @memberof SuperService
   */
  static async addMovie(data) {
    const { title, genre, year } = data;
    return db.none(addMovie, [title, genre, year]);
  }
}
