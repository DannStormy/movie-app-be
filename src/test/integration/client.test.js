import chai from "chai";
import chaiHttp from "chai-http";
import {
  testClient,
  clientLogin,
  firstNameAbsent,
  lastNameAbsent,
  emailAbsent,
  passwordAbsent,
  missingClientEmail,
  missingClientPassword,
} from "../fixtures/client";
import { apiMessage } from "../../utils/helpers/constants";
import app from "../../../index";

const { expect } = chai;
chai.use(chaiHttp);

describe("Client Routes", () => {
  it("should sign up client successfully", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(testClient)
      .end((err, res) => {
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal(
          "account registered, check email for verification link"
        );
        process.env.EMAIL = res.body.data.email;
        process.env.EMAIL_VERIFICATION_TOKEN =
          res.body.data.emailverificationtoken;
        done(err);
      });
  });

  it("should fail to sign up client if firstName is missing", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(firstNameAbsent)
      .end((err, res) => {
        expect(res.body.message).to.equal("firstName is a required field");
        done(err);
      });
  });

  it("should fail to sign up client if lastName is missing", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(lastNameAbsent)
      .end((err, res) => {
        expect(res.body.message).to.equal("lastName is a required field");
        done(err);
      });
  });

  it("should fail to sign up client if email is missing", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(emailAbsent)
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should fail to sign up client if password is missing", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(passwordAbsent)
      .end((err, res) => {
        expect(res.body.message).to.equal("Password field is required");
        done(err);
      });
  });

  it("should regenerate email verification token", (done) => {
    chai
      .request(app)
      .put("/user/regenerate-email-token")
      .send({ email: process.env.EMAIL })
      .end((err, res) => {
        expect(res.body.message).to.equal("check email for verification link");
        process.env.EMAIL_VERIFICATION_TOKEN = res.body.data;
        done(err);
      });
  });

  it("should fail to regenerate email verification token", (done) => {
    chai
      .request(app)
      .put("/user/regenerate-email-token")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should verify client email", (done) => {
    chai
      .request(app)
      .put("/user/verify-email")
      .set("Content-Type", "application/json")
      .send({
        emailToken: process.env.EMAIL_VERIFICATION_TOKEN,
      })
      .end((err, res) => {
        expect(res.body.message).to.equal("email verified");
        done(err);
      });
  });

  it("should fail to verify client email", (done) => {
    chai
      .request(app)
      .put("/user/verify-email")
      .set("Content-Type", "application/json")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Token is a required field");
        done(err);
      });
  });

  it("should login client", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send(clientLogin)
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.LOGIN_USER_SUCCESSFULLY);
        process.env.CLIENT_TOKEN = res.body.data.token;
        done(err);
      });
  });

  it("should not login client if email is missing", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send(missingClientEmail)
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should not login client if password is missing", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send(missingClientPassword)
      .end((err, res) => {
        expect(res.body.message).to.equal("Password field is required");
        done(err);
      });
  });

  it("should send reset password mail", (done) => {
    chai
      .request(app)
      .put("/user/forgotpassword")
      .send({ email: process.env.EMAIL })
      .end((err, res) => {
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal(
          apiMessage.RESET_PASSWORD_MAIL_SUCCESS
        );
        process.env.PASSWORD_RESET_TOKEN = res.body.data;
        done(err);
      });
  });

  it("should not send reset password mail", (done) => {
    chai
      .request(app)
      .put("/user/forgotpassword")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should regenerate password reset token", (done) => {
    chai
      .request(app)
      .put("/user/regenerate-password-token")
      .send({ email: process.env.EMAIL })
      .end((err, res) => {
        expect(res.body.message).to.equal(
          "check email for reset password link"
        );
        process.env.PASSWORD_RESET_TOKEN = res.body.data;
        done(err);
      });
  });

  it("should not regenerate password reset token", (done) => {
    chai
      .request(app)
      .put("/user/regenerate-password-token")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should not reset client password if reset password token is missing", (done) => {
    chai
      .request(app)
      .put("/user/resetpassword")
      .set("Content-Type", "application/json")
      .send({
        password: "Daniel1",
      })
      .end((err, res) => {
        expect(res.body.message).to.equal(
          "resetPasswordToken is a required field"
        );
        done(err);
      });
  });

  it("should not reset client password if password is missing", (done) => {
    chai
      .request(app)
      .put("/user/resetpassword")
      .set("Content-Type", "application/json")
      .send({
        resetPasswordToken: process.env.PASSWORD_RESET_TOKEN,
      })
      .end((err, res) => {
        expect(res.body.message).to.equal("Password field is required");
        done(err);
      });
  });

  it("should reset client password", (done) => {
    chai
      .request(app)
      .put("/user/resetpassword")
      .set("Content-Type", "application/json")
      .send({
        password: "Daniel1",
        resetPasswordToken: process.env.PASSWORD_RESET_TOKEN,
      })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.RESET_PASSWORD_SUCCESS);
        done(err);
      });
  });
});
