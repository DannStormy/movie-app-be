import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";

const { addUser, loginUser } = UserService;
const { generateJWT } = Helper;

const register = async (req, res) => {
  try {
    await addUser(req.body);
    return res.status(200).json({
      message: "register successful",
      // return the user details
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const login = async (req, res) => {
  try {
    await loginUser(req.body); // remove this
    const data = { userId: req.user.id, role: "user" };
    let token = await generateJWT(data); // parse req.user.id  and role which should be 'user' instead
    return res.status(200).json({
      message: "login successful",
      data: { token, user: req.user },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { register, login };
