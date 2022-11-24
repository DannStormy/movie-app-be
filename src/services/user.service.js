import db from "../config/config";
import Helper from '../utils/helpers/helpers';
import user_queries from "../queries/user.queries";

const { registerUser, loginUser, findUserByEmail } = user_queries;

export default class UserService {
    /**
     * register new user
     * @memberof UserService
     */
    static async addUser(data) {
        const { firstName, lastName, email, password } = data;
        password = await Helper.generatePasswordHash(password);
        return db.none(registerUser, [firstName, lastName, email, password]);
    }

    /**
    * get user by email
    * @memberof UserService
    */
    static async getUserByEmail(email) {
        return db.oneOrNone(findUserByEmail, [email]);
    }

    /**
     * login user
     * @memberof UserService
     */
    static async loginUser(data) {
        const { email, password } = data;
        return db.oneOrNone(loginUser, [email, password])
    }
}
