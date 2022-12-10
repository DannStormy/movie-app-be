import _ from "lodash";
import config from "../config";
import { userDetails } from "../utils/helpers/constants/constants";
import randomstring from "randomstring";
import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import sendEmail from "../utils/helpers/mailer/mailer";
import { Response, apiMessage } from "../utils/helpers/constants";

const { addUser, updatePassword } = UserService;
const { generateJWT } = Helper;

export const register = async (req, res) => {
  try {
    const { email } = req.body;
    const { role_id } = await UserService.fetchUserRole("client");

    req.body.role_id = role_id;
    req.body.emailverificationtoken = randomstring.generate();
    req.body.email_verification_expire = Helper.setTokenExpire(1);

    const user = await addUser(req.body);
    const details = _.pick(user, userDetails);

    const emailVerificationLink = `${config.HOST}/${req.body.emailverificationtoken}`;
    await sendEmail(email, "Verify Your Email", emailVerificationLink);

    return Response.successResponse(res, {
      code: 206,
      data: details,
      message: "account registered, check email for verification link",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const regenerateEmailVerificationToken = async (req, res) => {
  try {
    const { email } = req.body;
    const token = randomstring.generate();
    const tokenExpire = Helper.setTokenExpire(1);

    await UserService.updateEmailVerificationToken(token, tokenExpire, email);
    await sendEmail(email, "Verify Your Email", token);

    return Response.successResponse(res, {
      message: "check email for verification link",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const login = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: req.user.role_id };
    const token = generateJWT(data);
    const user = _.pick(req.user, userDetails);

    return Response.successResponse(res, {
      data: { ...token, user: user },
      message: apiMessage.LOGIN_USER_SUCCESSFULLY,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const verifyEmail = async (req, res) => {
  try {
    await UserService.verifyEmail(req.email);

    return Response.successResponse(res, {
      message: "email verified",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { user } = req;

    const token = randomstring.generate();
    await UserService.updatePasswordResetString(token, user.id);

    const passwordResetLink = `${process.env.HOST}/${user.email}/${token}`;
    await sendEmail(user.email, "Forgot Password", passwordResetLink);

    return Response.successResponse(res, {
      message: apiMessage.RESET_PASSWORD_MAIL_SUCCESS,
      code: 200,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const resetPassword = async (req, res) => {
  try {
    const {
      body: { password },
      user: { id, email, role_id },
    } = req;

    await updatePassword(password, email);
    await sendEmail(
      email,
      "Password Changed",
      `Your password has been reset. If you did not initiate this action, request help @`
    );

    const data = { id, role_id };
    const token = generateJWT(data);
    const user = _.pick(req.user, userDetails);

    return Response.successResponse(res, {
      data: { ...token, user: user },
      message: apiMessage.LOGIN_USER_SUCCESSFULLY,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
