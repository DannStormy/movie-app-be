import config from "../../config";
import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: config.MAIL_USERNAME,
        pass: config.MAIL_PASSWORD,
        clientId: config.OAUTH_CLIENTID,
        clientSecret: config.OAUTH_CLIENT_SECRET,
        refreshToken: config.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: "movies@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    logger.info("email sent sucessfully");
  } catch (error) {
    logger.error(error, "email not sent");
  }
};

export default sendEmail;
