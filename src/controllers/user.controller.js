import _ from "lodash";
import config from "../config";
import { userDetails } from "../utils/constants/constants";
import randomstring from "randomstring";
import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import sendEmail from "../utils/mailer/mailer";
import { Response, apiMessage } from "../utils/constants";

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

    if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        code: 206,
        data: details,
        message: "account registered, check email for verification link",
      });

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

    await UserService.updateEmailVerificationToken(token, tokenExpire, req.user.id);

    if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        code: 206,
        data: token,
        message: "check email for verification link",
      });

    await sendEmail(email, "verify your email", token);

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
    await UserService.verifyEmail(req.userId);

    return Response.successResponse(res, {
      message: "email verification successful",
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

    await UserService.updatePasswordResetString(token, tokenExpire, email);
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

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.user;

    await updatePassword(req.body.password, email);

    if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        message: apiMessage.RESET_PASSWORD_SUCCESS,
      });

    await sendEmail(email, apiMessage.RESET_PASSWORD_MAIL_SUCCESS);

    return Response.successResponse(res, {
      message: apiMessage.RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
