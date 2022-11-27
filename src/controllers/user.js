import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";

const { addUser, addStatus } = UserService;
const { generateJWT } = Helper;

const register = async (req, res) => {
  try {
    const user = await addUser(req.body);
    await(addStatus(user.id))
    delete req.body.password;
    return res.status(200).json({
      message: "register successful",
      data: user
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const login = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: "user" };
    let token = await generateJWT(data);
    delete req.user.password
    return res.status(200).json({
      message: "login successful",
      data: { ...token, user: req.user },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { register, login };
