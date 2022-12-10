import request from "supertest";
import assert from "assert";
import * as app from '../../../index'

describe("user Auth integration test", () => {
  it("should sign up user one successfully", (done) => {
    request(app.app)
      .post('/user/register')
      .send({
        firstName: "Rashidat",
        lastName: "Sikiru",
        email: "rashidat@mailinator.com",
        password: "Rashidat1",
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(
          res.body.message,
          "account registered, check email for verification link"
        );
        assert.equal(res.body.status, "success");
        assert.equal(res.body.data.firstname, "Rashidat");
        assert.equal(res.body.data.lastname, "Sikiru");
        assert.equal(res.body.data.email, "rashidat@mailinator.com");
        done();
      });
  });
});
