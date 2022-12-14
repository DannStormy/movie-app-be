import chai from "chai";
import chaiHttp from "chai-http";
import { apiMessage } from "../../utils/helpers/constants";
import app from "../../../index";
import {
  createTestAdmin,
  superAdminLogin,
  testAdminLogin,
} from "../fixtures/admin";

const { expect } = chai;
chai.use(chaiHttp);

describe("Admin Routes", () => {
  it("should login super admin", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .set("Content-Type", "application/json")
      .send(superAdminLogin)
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.LOGIN_USER_SUCCESSFULLY);
        process.env.SUPER_ADMIN_TOKEN = res.body.data.token;
        process.env.SUPER_ADMIN_EMAIL = res.body.data.user.email;
        done(err);
      });
  });

  it("should create new admin", (done) => {
    chai
      .request(app)
      .post("/admin/create-admin")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send(createTestAdmin)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_CREATE_SUCCESS("admin")
        );
        process.env.ADMIN_EMAIL = res.body.data.email;
        process.env.RESET_PASSWORD_TOKEN = res.body.data.password_reset_string;
        done(err);
      });
  });

  it("should not set new admin password", (done) => {
    chai
      .request(app)
      .post(`/admin/resetpassword/${process.env.RESET_PASSWORD_TOKEN}`)
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Password field is required");
        done(err);
      });
  });
  it("should set new admin password", (done) => {
    chai
      .request(app)
      .post(`/admin/resetpassword/${process.env.RESET_PASSWORD_TOKEN}`)
      .send({ password: "Mogul1" })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.RESET_PASSWORD_SUCCESS);
        done(err);
      });
  });

  it("should not send reset password mail", (done) => {
    chai
      .request(app)
      .post("/admin/forgotpassword")
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Email is a required field");
        done(err);
      });
  });

  it("should send reset password mail", (done) => {
    chai
      .request(app)
      .post("/admin/forgotpassword")
      .send({ email: process.env.ADMIN_EMAIL })
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESET_PASSWORD_MAIL_SUCCESS
        );
        process.env.RESET_PASSWORD_TOKEN = res.body.data;
        done(err);
      });
  });

  it("should not reset admin password", (done) => {
    chai
      .request(app)
      .post(`/admin/resetpassword/${process.env.RESET_PASSWORD_TOKEN}`)
      .send({})
      .end((err, res) => {
        expect(res.body.message).to.equal("Password field is required");
        done(err);
      });
  });

  it("should reset admin password", (done) => {
    chai
      .request(app)
      .post(`/admin/resetpassword/${process.env.RESET_PASSWORD_TOKEN}`)
      .send({ password: "John1" })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.RESET_PASSWORD_SUCCESS);
        done(err);
      });
  });

  it("should login admin", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .set("Content-Type", "application/json")
      .send({ email: process.env.ADMIN_EMAIL, password: "John1" })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.LOGIN_USER_SUCCESSFULLY);
        process.env.ADMIN_TOKEN = res.body.data.token;
        done(err);
      });
  });

  it("should fetch all users", (done) => {
    chai
      .request(app)
      .get("/admin/users")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_FETCH_SUCCESS("users")
        );
        done(err);
      });
  });

  it("should deactivate admin account", (done) => {
    chai
      .request(app)
      .put(`/admin/accounts/${2}/toggle-status`)
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send({status: false})
      .end((err, res) => {
        expect(res.body.message).to.equal("admin status updated successfully");
        done(err);
      });
  });

  it("should activate admin account", (done) => {
    chai
      .request(app)
      .put(`/admin/accounts/${2}/toggle-status`)
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send({status: true})
      .end((err, res) => {
        expect(res.body.message).to.equal("admin status updated successfully");
        done(err);
      });
  });
});
