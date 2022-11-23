import Helper from "../utils/helpers/helpers";
import UserService from "../services/user_service";

const { addUser, loginUser } = UserService
const { generateJWT } = Helper

const register = async (req, res) => {
    try {
        await addUser(req.body)
        return res.status(200).json({
            message: 'register successful'
        })
    } catch (error) {
        console.log(error) //will use logger instead (testing now)
        return error
    }
}

const login = async (req, res) => {
    try {
        await loginUser(req.body)
        let token = await generateJWT(req.body)
        return res.status(200).json({
            message: 'login successful',
            data: token
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export { register, login }