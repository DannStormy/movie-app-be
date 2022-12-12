import chai from "chai";
import chaiHttp from "chai-http";
import { testClient, clientLogin } from "../fixtures/client";
import { apiMessage } from "../../utils/helpers/constants";
import app from "../../../index";

const { expect } = chai;
chai.use(chaiHttp);

describe("Movie Routes", () => {
  it("should fetch all movies when queries are not specified", (done) => {
    chai
      .request(app)
      .get("/movies")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_FETCH_SUCCESS("Movies")
        );
        expect(res.body.data).to.have.property("totalPages");
        expect(res.body.data).to.have.property("result");
        done(err);
      });
  });

  it("should fetch movies for specified queries", (done) => {
    chai
      .request(app)
      .get("/movies")
      .query({
        title: "king",
        genre: "comedy",
        year: 2017,
      })
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_FETCH_SUCCESS("Movies")
        );
        expect(res.body.data).to.have.property("totalPages");
        expect(res.body.data).to.have.property("result");
        done(err);
      });
  });

  it("should fetch movie by specified id", (done) => {
    chai
      .request(app)
      .get("/movies/8")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_FETCH_SUCCESS("Movie")
        );
        expect(res.body.data).to.have.property("average_rating");
        expect(res.body.data).to.have.property("reviews");
        done(err);
      });
  });
});
