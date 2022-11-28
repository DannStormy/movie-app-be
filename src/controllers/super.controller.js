import Helper from "../utils/helpers/helpers";
import SuperService from "../services/super.service";

const { generateJWT } = Helper;
const {
  fetchAllUsers,
  createAdmin,
  setUserStatus,
  setAdminStatus,
  fetchAdmin,
  fetchUser,
} = SuperService;

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

const createNewAdmin = async (req, res) => {
  try {
    await createAdmin(req.body);
    return res.status(200).json({
      message: "admin created",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const changeUserStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const user = await fetchUser(id);
    if (!user)
      return res
        .status(400)
        .json({ message: `User account with id:${id} not found` });
    await setUserStatus(req.body);
    return res.status(200).json({
      message: `User account with id:${id} set to ${status}`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const changeAdminStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const admin = await fetchAdmin(id);
    if (!admin)
      return res
        .status(400)
        .json({ message: `Admin account with id:${id} not found` });
    await setAdminStatus(req.body);
    return res.status(200).json({
      message: `Admin account with id:${id} set to ${status}`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  superLogin,
  fetchUsers,
  createNewAdmin,
  changeUserStatus,
  changeAdminStatus,
};
