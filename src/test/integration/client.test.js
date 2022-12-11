import { testClient, clientLogin } from "../fixtures/client";
import { apiMessage } from "../../utils/helpers/constants";
import request from "supertest";
import assert from "assert";
import app from "../../../index";

describe("Client Routes", () => {
  it("should sign up client successfully", (done) => {
    request(app)
      .post("/user/register")
      .send(testClient)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(
          res.body.message,
          "account registered, check email for verification link"
        );
        assert.equal(res.body.status, "success");
        process.env.EMAIL_VERIFICATION_TOKEN =
          res.body.data.emailverificationtoken;
        done();
      });
  });
  
  it("should verify client email", (done) => {
    request(app)
      .put("/user/verify-email")
      .send({
        emailToken: process.env.EMAIL_VERIFICATION_TOKEN,
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, "email verified");
        done();
      });
  });

  it("should login client", (done) => {
    request(app)
      .post("/user/login")
      .send(clientLogin)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, apiMessage.LOGIN_USER_SUCCESSFULLY);
        process.env.CLIENT_TOKEN = res.body.data.token;
        done();
      });
  });
});
