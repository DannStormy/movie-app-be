import chai from "chai";
import chaiHttp from "chai-http";
import { testClient, clientLogin } from "../fixtures/client";
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
        process.env.EMAIL_VERIFICATION_TOKEN =
          res.body.data.emailverificationtoken;
        done(err);
      });
  });

  it("should regenerate email verification token", (done) => {
    chai
      .request(app)
      .put("/user/regenerate-email-token")
      .send({ email: testClient.email })
      .end((err, res) => {
        expect(res.body.message).to.equal("check email for verification link");
        process.env.EMAIL_VERIFICATION_TOKEN =
          res.body.data;
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

  it("should send reset password mail", (done) => {
    chai
      .request(app)
      .put("/user/forgotpassword")
      .send({ email: testClient.email })
      .end((err, res) => {
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal(
          apiMessage.RESET_PASSWORD_MAIL_SUCCESS
        );
        process.env.PASSWORD_RESET_TOKEN = res.body.data.token;
        done(err);
      });
  });

  it("should regenerate password reset token", (done) => {
    chai
      .request(app)
      .put("/user/regenerate-password-token")
      .send({ email: testClient.email })
      .end((err, res) => {
        expect(res.body.message).to.equal("check email for reset password link");
        process.env.EMAIL_VERIFICATION_TOKEN =
          res.body.data;
        done(err);
      });
  });

  it("should reset client password", (done) => {
    chai
      .request(app)
      .put("/user/forgotpassword")
      .set("Content-Type", "application/json")
      .send({
        password: "Daniel1",
        resetPasswordToken: process.env.PASSWORD_RESET_TOKEN,
      })
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESET_PASSWORD_SUCCESS
        );
        done(err);
      });
  });
});
