import randomstring from "randomstring";
import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import sendEmail from "../utils/helpers/mailer/mailer";
import { Response, apiMessage } from "../utils/helpers/constants";

const { addUser, addStatus, updatePassword } = UserService;
const { generateJWT } = Helper;

export const register = async (req, res) => {
  try {
    req.body.role_id = 3;
    const user = await addUser(req.body);

    await addStatus(user.id);
    delete user.password;
    await sendEmail(
      req.body.email,
      "Welcome",
      "You successfully registered to MovieApp.io"
    );

    return Response.successResponse(res, {
      code: 201,
      message: apiMessage.RESOURCE_CREATE_SUCCESS("client"),
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

    delete req.user.password;

    return Response.successResponse(res, {
      data: { ...token, user: req.user },
      message: apiMessage.LOGIN_USER_SUCCESSFULLY,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const randomString = randomstring.generate();
    await UserService.passwordResetString(randomString, userEmail.id);
    const link = `${process.env.HOST}/${email}/${randomString}`;
    await sendEmail(email, "Forgot Password", link);

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
    await updatePassword(req.body.password, req.params.email);
    await sendEmail(
      req.params.email,
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
