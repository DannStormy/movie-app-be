import chai from "chai";
import chaiHttp from "chai-http";
import { apiMessage } from "../../utils/helpers/constants";
import app from "../../../index";
import {
  missingGenre,
  missingRating,
  missingReview,
  missingTitle,
  missingYear,
  movieTitle,
  newMovie,
  rateMovie,
} from "../fixtures/movie";

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

  it("should add movie", (done) => {
    chai
      .request(app)
      .post("/movies")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send(newMovie)
      .end((err, res) => {
        expect(res.body.status).to.equal("success");
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_CREATE_SUCCESS("movie")
        );
        done(err);
      });
  });

  it("should not add movie if title is missing", (done) => {
    chai
      .request(app)
      .post("/movies")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send(missingTitle)
      .end((err, res) => {
        expect(res.body.message).to.equal("title is a required field");
        done(err);
      });
  });

  it("should not add movie if genre is missing", (done) => {
    chai
      .request(app)
      .post("/movies")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send(missingGenre)
      .end((err, res) => {
        expect(res.body.message).to.equal("genre is a required field");
        done(err);
      });
  });

  it("should not add movie if year is missing", (done) => {
    chai
      .request(app)
      .post("/movies")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send(missingYear)
      .end((err, res) => {
        expect(res.body.message).to.equal("year is a required field");
        done(err);
      });
  });

  it("should rate a movie", (done) => {
    chai
      .request(app)
      .post("/movies/rating/10")
      .set({ Authorization: process.env.CLIENT_TOKEN })
      .send(rateMovie)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_CREATE_SUCCESS("rating")
        );
        done(err);
      });
  });

  it("should rate a movie without review", (done) => {
    chai
      .request(app)
      .post("/movies/rating/10")
      .set({ Authorization: process.env.CLIENT_TOKEN_2 })
      .send(missingReview)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_CREATE_SUCCESS("rating")
        );
        done(err);
      });
  });

  it("should not rate without rating value", (done) => {
    chai
      .request(app)
      .post("/movies/rating/7")
      .set({ Authorization: process.env.CLIENT_TOKEN_3 })
      .send(missingRating)
      .end((err, res) => {
        expect(res.body.message).to.equal("Rating is a required field");
        done(err);
      });
  });

  it("should edit movie title", (done) => {
    chai
      .request(app)
      .put("/movies/title/10")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .send(movieTitle)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          apiMessage.RESOURCE_UPDATE_SUCCESS("Title")
        );
        done(err);
      });
  });

  it("should not edit movie title", (done) => {
    chai
      .request(app)
      .put("/movies/title/10")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .end((err, res) => {
        expect(res.body.message).to.equal("Title is a required field");
        done(err);
      });
  });

  it("should edit movie rating", (done) => {
    chai
      .request(app)
      .put("/movies/rating/10")
      .set({ Authorization: process.env.CLIENT_TOKEN })
      .send(missingReview)
      .end((err, res) => {
        expect(res.body.message).to.equal('Rating/Review updated successfully');
        done(err);
      });
  });

  it("should fetch all movie rating/reviews of a particular user", (done) => {
    chai
      .request(app)
      .get("/movies/user/rating/")
      .set({ Authorization: process.env.CLIENT_TOKEN })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.RESOURCE_FETCH_SUCCESS("Rating and Review"));
        done(err);
      });
  });

  it("should delete a movie", (done) => {
    chai
      .request(app)
      .delete("/movies/10")
      .set({ Authorization: process.env.SUPER_ADMIN_TOKEN })
      .end((err, res) => {
        expect(res.body.message).to.equal(apiMessage.RESOURCE_DELETE_SUCCESS("movie"));
        done(err);
      });
  });
});
