import Helper from "../utils/helpers/helpers";
import * as SuperService from "../services/super.service";
import logger from "../logger";

const { generateJWT } = Helper;

export const superLogin = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: "super" };
    let token = await generateJWT(data);
    delete req.user.password;
    return res.status(200).json({
      message: "login successful",
      data: { ...token, user: req.user },
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await SuperService.fetchAllUsers(req.body);
    return res.status(200).json({
      message: "users fetched",
      total: users.length,
      data: users,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createNewAdmin = async (req, res) => {
  try {
    await SuperService.createAdmin(req.body);
    return res.status(200).json({
      message: "admin created",
      data: req.body,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const changeUserStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const user = await SuperService.fetchUser(id);
    if (!user)
      return res
        .status(400)
        .json({ message: `User account with id:${id} not found` });
    await SuperService.setUserStatus(req.body);
    return res.status(200).json({
      message: `User account with id:${id} set to ${status}`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const changeAdminStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const admin = await SuperService.fetchAdmin(id);
    if (!admin)
      return res
        .status(400)
        .json({ message: `Admin account with id:${id} not found` });
    await SuperService.setAdminStatus(req.body);
    return res.status(200).json({
      message: `Admin account with id:${id} set to ${status}`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
