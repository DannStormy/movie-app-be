import bcrypt from 'bcrypt';

import Helper from '../utils/helpers/helpers';
import userSchema from "../validations/userSchema";
import UserService from "../services/user_service"

const { registerSchema, loginSchema } = userSchema;
const { getUserByEmail } = UserService;

export default class UserMiddleware {
    /**
     * validates register user post request
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {Next} next - The function that calls the next handler.
     * @returns { JSON } - Returns the details
     */

    static async checkRegister(req, res, next) {
        try {
            await registerSchema.validateAsync(req.body);
            return next()
        }
        catch (err) {
            return res.status(406).json({ message: err.message })
        }
    };

    /**
     * validates login user post request
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {Next} next - The function that calls the next handler.
     * @returns { JSON } - Returns the details
     */

    static async checkLogin(req, res, next) {
        try {
            await loginSchema.validateAsync(req.body);
            return next()
        }
        catch (err) {
            return res.status(406).json({ message: err.message })
        }
    };

    /**
     * Checks if user exists
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {Next} next - The function that calls the next handler.
     * @returns { JSON } - Returns message
     */

    static async checkUserExists(req, res, next) {
        try {
            const { email } = req.body;
            const user = await getUserByEmail(email);
            if (user) {
                return res.status(409).json({ status: 'conflict', message: 'user exists' })
            }
            return next()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    /**
     * find user in users table 
     * @static
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {Next} next - The function that calls the next handler.
     * @returns { JSON } - Returns message
     */
    static async checkUserDetails(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await getUserByEmail(email);
            if (!user) {
                return res.status(409).json({ status: 'conflict', message: 'user does not exist' })
            }
            const passwordMatch = await Helper.comparePasswordHash(password, user.password);
            if (!passwordMatch) {
                return res.status(403).json({ status: 'forbidden', message: 'wrong password' })
            }
            return next()
        } catch (error) {
            console.log(error)
            return error
        }
    }
}