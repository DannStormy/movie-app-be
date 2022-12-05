import Helper from "../utils/helpers/helpers";
import AdminService from "../services/admin.service";
import { Response, apiMessage } from "../utils/helpers/constants";

const { generateJWT } = Helper;

export const adminLogin = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: req.user.role_id };
    let token = generateJWT(data);
    delete req.user.password;
    Response.successResponse(res, {
      data: { ...token, user: req.user },
      message: apiMessage.LOGIN_USER_SUCCESSFULLY,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await AdminService.fetchAllUsers(req.query);
    Response.successResponse(res, {
      data: users,
      message: apiMessage.RESOURCE_FETCH_SUCCESS("users"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createNewAdmin = async (req, res) => {
  try {
    await AdminService.createAdmin(req.body);
    Response.successResponse(res, {
      code: 201,
      message: apiMessage.RESOURCE_CREATE_SUCCESS("admin"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const changeUserStatus = async (req, res) => {
  try {
    await AdminService.setUserStatus(req.body.status, req.params.userId);
    Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("user status"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const changeAdminStatus = async (req, res) => {
  try {
    await AdminService.setAdminStatus(req.body.status, req.params.adminId);
    Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("admin status"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
