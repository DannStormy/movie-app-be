import User from "../services/userService";

const { addUser, loginUser } = User

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
        return res.status(200).json({
            message: 'login successful'
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export { register, login }