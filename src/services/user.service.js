import randomstring from "randomstring";
import db from "../config/db/config";
import Helper from "../utils/helpers/helpers";
import user_queries from "../queries/user.queries";

export default class UserService {
  /**
   * register new user
   * @memberof UserService
   */
  static async addUser(data) {
    let {
      firstName,
      lastName,
      email,
      password,
      role_id,
      emailverificationtoken,
      email_verification_expire,
    } = data;
    email = email.trim().toLowerCase();
    password = Helper.generatePasswordHash(password);
    return db.one(user_queries.registerUser, [
      firstName,
      lastName,
      email,
      password,
      role_id,
      emailverificationtoken,
      email_verification_expire,
    ]);
  }

  /**
   * fetch role id
   * @memberof UserService
   */
  static async fetchUserRole(role) {
    return db.oneOrNone(user_queries.fetchUserRole, [role]);
  }

  /**
   * get user by email
   * @memberof UserService
   */
  static async getUserByEmail(email) {
    return db.oneOrNone(user_queries.findUserByEmail, [email]);
  }

  /**
   * check client account status
   * @memberof UserService
   */
  static async fetchClientStatus(id) {
    return db.oneOrNone(user_queries.checkClientStatus, [id]);
  }

  /**
   * update client password
   * @memberof UserService
   */
  static async updatePassword(password, email) {
    password = Helper.generatePasswordHash(password);
    return db.oneOrNone(user_queries.updatePassword, [password, email]);
  }

  /**
   *  set email verification token
   * @memberof UserService
   */
  static async updateEmailVerificationToken(token, token_expire, userId) {
    return db.none(user_queries.updateEmailVerificationToken, [
      token,
      token_expire,
      userId,
    ]);
  }

  /**
   *  set user email verified status
   * @memberof UserService
   */
  static async updateIsEmailVerified(userId) {
    return db.none(user_queries.updateIsEmailVerified, [userId]);
  }

  /**
   *  set password reset token
   * @memberof UserService
   */
  static async updatePasswordResetString(token, tokenExpire, email) {
    return db.none(user_queries.updatePasswordResetString, [
      token,
      tokenExpire,
      email,
    ]);
  }

  /**
   *  fetch password reset token
   * @memberof UserService
   */
  static async fetchUserByPasswordToken(token) {
    return db.oneOrNone(user_queries.fetchUserByPasswordToken, [token]);
  }

  /**
   *  fetch email verification token
   * @memberof UserService
   */
  static async fetchUserByEmailVerificationToken(token) {
    return db.oneOrNone(user_queries.fetchUserByEmailVerificationToken, [token]);
  }

  /**
   *  verify email
   * @memberof UserService
   */
  static async verifyEmail(userId) {
    return Promise.all([
      UserService.updateEmailVerificationToken(null, null, userId),
      UserService.updateIsEmailVerified(userId),
    ]);
  }
}
