import config from "../../config";
import db from "../../config/db/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminQueries from "../../queries/admin.queries";
import userQueries from "../../queries/user.queries";

export default class Helper {
  /**
   * validates an input based on a schema
   * @static
   * @param { Joi } schema - The validation schema.
   * @param { Object } object - The data to be validated
   * @memberof Helper
   * @returns { boolean }
   */
  static async validateInput(schema, object) {
    return schema.validateAsync(object);
  }

  /**
   * hash password
   * @static
   * @memberof Helper
   * @returns {string | number } - generate password hash.
   */
  static generatePasswordHash(password) {
    return bcrypt.hashSync(password, 10);
  }

  static async fetchResourceByPage({
    page,
    limit,
    getCount,
    getResources,
    params = [],
    countParams = [],
  }) {
    const offSet = (page - 1) * +limit;
    const fetchCount = db.one(getCount, [...countParams]);
    const fetchCountResource = db.any(getResources, [
      offSet,
      +limit,
      ...params,
    ]);
    return Promise.all([fetchCount, fetchCountResource]);
  }

  /**
   * calculate number of pages
   * @static
   * @param { Number } total - Total number of a particular resource.
   * @param { Number } limit - The total number of resource to be displayed per page
   * @memberof Helper
   * @returns { Number } - Returns the display page value.
   */
  static calcPages(total, limit) {
    const displayPage = Math.floor(total / +limit);
    return total % +limit ? displayPage + 1 : displayPage;
  }

  /**
   * compare hash password
   * @static
   * @memberof Helper
   * @returns {Boolean}
   */
  static async comparePasswordHash(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * generate JWT token
   * @static
   * @memberof Helper
   * @returns {String}
   */
  static generateJWT(data) {
    const token = jwt.sign(data, config.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(data, config.REFRESH_SECRET);
    return { token, refreshToken };
  }

  /**
   * verify JWT token
   * @static
   * @memberof Helper
   * @returns {String}
   */
  static verifyToken(token, JWT_SECRET) {
    return jwt.verify(token, JWT_SECRET);
  }

  /**
   * Account active? Checks if user/admin account is active.
   * @static
   */
  static async isActive(userId, role) {
    try {
      if (role === 3) {
        const { status } = await db.one(userQueries.checkClientStatus, [
          userId,
        ]);
        return status;
      }
      if (role === 2) {
        const { status } = await db.one(adminQueries.findAdminByID, [userId]);
        return status;
      }
      return true;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * set expiry time for tokens.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helpers
   * @returns {String} - It returns null.
   */
  static setTokenExpire(minutes) {
    const expiresIn = new Date().getTime() + minutes * 60 * 1000;
    return new Date(expiresIn);
  }
}
