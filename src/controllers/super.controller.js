import Helper from "../utils/helpers/helpers";
import SuperService from "../services/super.service";

const { generateJWT } = Helper;
const { fetchAllUsers, createAdmin, addMovie, setAccountStatus } = SuperService;

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

const addNewMovie = async (req, res) => {
  try {
    await addMovie(req.body);
    return res.status(200).json({
      message: "movie added",
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
    await setAccountStatus(req.body);
    return res.status(200).json({
      message: `Account with id:${id} set to ${status}`,
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
  addNewMovie,
  changeUserStatus,
};
