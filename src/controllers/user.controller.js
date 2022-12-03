import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import sendEmail from "../utils/helpers/mailer/mailer";

const { addUser, addStatus, getUserByEmail, updatePassword } = UserService;
const { generateJWT } = Helper;

export const register = async (req, res) => {
  try {
    req.body.role_id = 3;
    const user = await addUser(req.body);
    await addStatus(user.id);
    delete user.password;
    await sendEmail(req.body.email, "Welcome", "You successfully registered");
    return res.status(200).json({
      message: "register successful",
      data: user,
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
    return res.status(200).json({
      message: "login successful",
      data: { ...token, user: req.user },
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userEmail = await getUserByEmail(email);
    if (!userEmail) {
      return res.status(401).json({
        status: "Failed",
        message: "No user with this email",
      });
    }
    // use generated random string
    const sessionToken = await generateJWT(userEmail.id);
    const link = `${process.env.HOST}/${email}/${sessionToken.token}`;
    await sendEmail(email, "Forgot Password", link);
    return res.status(200).json({
      message: "password reset link sent to your email account",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const resetPassword = async (req, res) => {
  try {
    await updatePassword(req.body, req.params);
    return res.status(200).json({
      message: "password updated, proceed to login",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
