import Helper from "../utils/helpers/helpers";

const { generateJWT } = Helper;

const adminLogin = async (req, res) => {
  try {
    const data = { superID: req.user.id, role: "admin" };
    let token = await generateJWT(data);
    delete req.user.password;
    return res.status(200).json({
      message: "login successful",
      data: { ...token, user: req.user },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default adminLogin;
