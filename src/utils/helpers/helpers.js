import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class Helper {
/**
   * hash password
   * @static
   * @memberof Helper
   * @returns {string | number } - generate password hash.
   */
  static async generatePasswordHash(password) {
    const hash = await bcrypt.hashSync(password, 10);
    return hash
  }
/**
   * compare hash password
   * @static
   * @memberof Helper
   * @returns {Boolean}
   */
  static async comparePasswordHash(password, hash) {
    const result = await bcrypt.compare(password, hash);
    console.log('Result', hash)
    return result;
  }
/**
   * generate user token
   * @static
   * @memberof Helper
   * @returns {String}
   */
  static async generateJWT(payload) {
    const sessionToken = jwt.sign(
        {
            data: payload,
        },
        process.env.JWT_SECRET_KEY, { expiresIn: '1h' }
    );
    return sessionToken
  }



}