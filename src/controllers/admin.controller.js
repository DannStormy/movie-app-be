import Helper from "../utils/helpers/helpers";
import AdminService from "../services/admin.service";

const { generateJWT } = Helper;

export const superLogin = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: "super" };
    let token = generateJWT(data);
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

export const adminLogin = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: req.user.role_id };
    let token = generateJWT(data);
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
    const users = await AdminService.fetchAllUsers(req.query);
    return res.status(200).json({
      message: "users fetched",
      data: users,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createNewAdmin = async (req, res) => {
  try {
    await AdminService.createAdmin(req.body);
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
    await AdminService.setUserStatus(req.body.status, req.params.userId);
    return res.status(200).json({
      message: `User account with id:${req.params.userId} set to ${req.body.status}`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const changeAdminStatus = async (req, res) => {
  try {
    await AdminService.setAdminStatus(req.body.status, req.params.adminId);
    return res.status(200).json({
      message: `Admin account with id:${req.params.adminId} set to ${req.body.status}`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
