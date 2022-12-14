import config from "../config";
import _ from "lodash";
import randomstring from "randomstring";
import Helper from "../utils/helpers/helpers";
import AdminService from "../services/admin.service";
import { Response, apiMessage } from "../utils/helpers/constants";
import sendEmail from "../utils/helpers/mailer/mailer";
import { userDetails } from "../utils/helpers/constants/constants";

const { generateJWT } = Helper;

export const adminLogin = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: req.user.role_id };
    let token = generateJWT(data);

    const details = _.pick(req.user, userDetails);

    return Response.successResponse(res, {
      data: { ...token, user: details },
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

    return Response.successResponse(res, {
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
    req.body.password_reset_string = randomstring.generate();
    req.body.password_reset_expire = Helper.setTokenExpire(1);

    const admin = await AdminService.createAdmin(req.body);
    const link = `https://movie.io/resetpassword/${req.body.password_reset_string}`;

    if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        code: 206,
        data: admin,
        message: apiMessage.RESOURCE_CREATE_SUCCESS("admin"),
      });

    await sendEmail(
      admin.email,
      "Reset Default Password",
      `You have been registered as an admin on MovieApp.io, click on this ${link} to set your password.`
    );

    return Response.successResponse(res, {
      code: 201,
      message: apiMessage.RESOURCE_CREATE_SUCCESS("admin"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = randomstring.generate();
    const tokenExpire = Helper.setTokenExpire(1);

    await AdminService.updatePasswordResetToken(token, tokenExpire, email);
    
    if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        message: apiMessage.RESET_PASSWORD_MAIL_SUCCESS,
        data: token,
      });

    const passwordResetLink = `https://movie.io/forgotpassword/${token}`;
    await sendEmail(email, "Forgot Password", passwordResetLink);

    return Response.successResponse(res, {
      message: apiMessage.RESET_PASSWORD_MAIL_SUCCESS,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const changeUserStatus = async (req, res) => {
  try {
    await AdminService.setUserStatus(req.body.status, req.params.userId);

    return Response.successResponse(res, {
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

    return Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("admin status"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const adminResetPassword = async (req, res) => {
  try {
    const { email } = req.user;

    await AdminService.adminResetPassword(req.body.password, email);

    if (config.NODE_ENV === "test")
    return Response.successResponse(res, {
      message: apiMessage.RESET_PASSWORD_SUCCESS,
    });

    await sendEmail(
      email,
      "Password Changed",
      `Your password has been reset. If you did not initiate this action, request help @`
    );

    return Response.successResponse(res, {
      message: apiMessage.RESET_PASSWORD_SUCCESS,
      code: 200,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
