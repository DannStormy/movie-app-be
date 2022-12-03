import db from "../../config/config";
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
    const result = await bcrypt.compare(password, hash);
    return result;
  }

  /**
   * generate JWT token
   * @static
   * @memberof Helper
   * @returns {String}
   */
  static generateJWT(data) {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET);
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
   * calculate movie rating.
   * @static
   */
  static async getRating(query, movieId) {
    try {
      const allRatings = [];
      const ratings = await db.manyOrNone(query, [movieId]);
      ratings.map((i) => {
        allRatings.push(i.rating);
      });
      const average = allRatings.reduce(function (a, b) {
        return a + b / allRatings.length.toFixed(2);
      }, 0);
      return average;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
