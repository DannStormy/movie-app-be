import Helper from "../utils/helpers/helpers";
import SuperService from "../services/super.service";

const { generateJWT } = Helper;
const { fetchAllUsers } = SuperService;

const superLogin = async (req, res) => {
  try {
    const data = { superID: req.user.id, role: "super" };
    let token = await generateJWT(data);
    delete req.user.password;
    return res.status(200).json({
      message: "login successful",
      data: { ...token, user: req.user },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    return res.status(200).json({
      message: "users fetched",
      total: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { superLogin, fetchUsers };
