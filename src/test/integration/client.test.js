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
  testClient2,
  testClient3,
  clientLogin2,
  clientLogin3,
} from "../fixtures/client";
import { apiMessage } from "../../utils/constants";
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

  it("should sign up client2 successfully", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(testClient2)
      .end((err, res) => {
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal(
          "account registered, check email for verification link"
        );
        process.env.EMAIL_2 = res.body.data.email;
        process.env.EMAIL_VERIFICATION_TOKEN_2 =
          res.body.data.emailverificationtoken;
        done(err);
      });
  });

  it("should sign up client3 successfully", (done) => {
    chai
      .request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send(testClient3)
      .end((err, res) => {
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal(
          "account registered, check email for verification link"
        );
        process.env.EMAIL_3 = res.body.data.email;
        process.env.EMAIL_VERIFICATION_TOKEN_3 =
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
      .post("/user/regenerate-email-token")
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
      .post("/user/regenerate-email-token")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should verify client email", (done) => {
    chai
      .request(app)
      .put(`/user/verify-email/${process.env.EMAIL_VERIFICATION_TOKEN}`)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal("email verification successful");
        done(err);
      });
  });

  it("should verify client 2 email", (done) => {
    chai
      .request(app)
      .put(`/user/verify-email/${process.env.EMAIL_VERIFICATION_TOKEN_2}`)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal("email verification successful");
        done(err);
      });
  });

  it("should verify client 3 email", (done) => {
    chai
      .request(app)
      .put(`/user/verify-email/${process.env.EMAIL_VERIFICATION_TOKEN_3}`)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal("email verification successful");
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

  it("should login client2", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send(clientLogin2)
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.LOGIN_USER_SUCCESSFULLY);
        process.env.CLIENT_TOKEN_2 = res.body.data.token;
        done(err);
      });
  });

  it("should login client3", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send(clientLogin3)
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.LOGIN_USER_SUCCESSFULLY);
        process.env.CLIENT_TOKEN_3 = res.body.data.token;
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
      .post("/user/forgotpassword")
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
      .post("/user/forgotpassword")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should not reset client password if password is missing", (done) => {
    chai
      .request(app)
      .put(`/user/resetpassword/${process.env.PASSWORD_RESET_TOKEN}`)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal("Password field is required");
        done(err);
      });
  });

  it("should reset client password", (done) => {
    chai
      .request(app)
      .put(`/user/resetpassword/${process.env.PASSWORD_RESET_TOKEN}`)
      .set("Content-Type", "application/json")
      .send({ password: "Daniel1" })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.RESET_PASSWORD_SUCCESS);
        done(err);
      });
  });

  it("should not deactivate user account if status value is missing", (done) => {
    chai
      .request(app)
      .put(`/admin/accounts/user/${1}/toggle-status`)
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal('"status" is required');
        done(err);
      });
  });

  it("should deactivate user account", (done) => {
    chai
      .request(app)
      .put(`/admin/accounts/user/${1}/toggle-status`)
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send({status: false})
      .end((err, res) => {
        expect(res.body.message).to.equal("user status updated successfully");
        done(err);
      });
  });

  it("should activate user account", (done) => {
    chai
      .request(app)
      .put(`/admin/accounts/user/${1}/toggle-status`)
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send({status: true})
      .end((err, res) => {
        expect(res.body.message).to.equal("user status updated successfully");
        done(err);
      });
  });
});
