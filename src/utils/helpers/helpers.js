import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
  static generateJWT(data) {
    return jwt.sign(data,  process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        // {
        //     data: payload, // this should be user id
        // },
       
    // );
    // return sessionToken
  }



}