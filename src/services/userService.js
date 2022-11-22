import bcrypt from 'bcrypt';

import db from "../config/config";
import user_queries from "../queries/user_queries";

const { registerUser, loginUser, findUserByEmail } = user_queries;

export default class UserService {
    /**
     * register new user
     * @memberof User
     */
    static async addUser(data) {
        let { firstName, lastName, email, password } = data;
        password = bcrypt.hashSync(password, 10);
        return db.none(registerUser, [firstName, lastName, email, password]);
    }

    /**
    * get user by email
    * @memberof User
    */
    static async getUserByEmail(email) {
        return db.oneOrNone(findUserByEmail, [email]);
    }

    /**
     * login user
     * @memberof User
     */
    static async loginUser(data) {
        let { email, password } = data;
        return db.any(loginUser, [email, password])
    }
}
