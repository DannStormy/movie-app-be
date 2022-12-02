import Helper from "../utils/helpers/helpers";

const { generateJWT, isActive } = Helper;

const adminLogin = async (req, res) => {
  try {
    const data = { userId: req.user.id, role: "admin" };
    const active = await isActive(data.userId, data.role);
    if (!active)
      return res.status(401).json({ message: "Account Deactivated" });
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

export default adminLogin;
