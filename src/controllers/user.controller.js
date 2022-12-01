import Helper from "../utils/helpers/helpers";
import UserService from "../services/user.service";
import sendEmail from "../utils/helpers/mailer/mailer";
import logger from "../logger";

const { addUser, addStatus, getUserByEmail } = UserService;
const { generateJWT, isActive } = Helper;

const register = async (req, res) => {
  try {
    const user = await addUser(req.body);
    await addStatus(user.id);
    delete req.body.password;
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

const login = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: "user" };
    const active = await isActive(data.userId, data.role)
    if (!active)
      return res.status(401).json({ message: "Account Deactivated" });
    const token = await generateJWT(data);
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

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userEmail = await getUserByEmail(email);
    if (!userEmail) {
      return res.status(401).json({
        status: "Failed",
        message: "No user with this email",
      });
    }
    const data = { userId: userEmail.id, role: "user" };
    const sessionToken = await generateJWT(data);
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

export { register, login, resetPassword };