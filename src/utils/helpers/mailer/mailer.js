import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: "movies@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    logger.log("email sent sucessfully");
  } catch (error) {
    logger.log(error, "email not sent");
  }
};

export default sendEmail;
