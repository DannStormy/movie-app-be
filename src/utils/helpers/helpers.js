import bcrypt from 'bcrypt';


export default class Helper {
/**
   * hash password
   * @static
   * @memberof Helper
   * @returns {string | number } - generate password hash.
   */
  static async generatePasswordHash(password) {
    const hash = await bcrypt.hash(password, 10);
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
    return result;
  }

}