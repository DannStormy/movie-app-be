import config from "../../config";
import { expect } from "chai";

import Helper from "../../utils/helpers/helpers";
import {
  rightHash,
  testObj,
  testSchema,
  wrongHash,
  wrongText,
  payload,
} from "../fixtures/helpers";

describe("Basic Utility Functions", () => {
  let token;

  it("should pass validations", async () => {
    try {
      await Helper.validateInput(testSchema, testObj);
    } catch (error) {
      expect(error).to.be.equal(null);
    }
  });

  it("should generate a string token of with plenty characters", () => {
    token = Helper.generateJWT({ payload }, "1d");
    expect(token.token).to.be.a("string").of.length.greaterThan(29);
  });

  it("should return decoded payload", () => {
    const payloadGotten = Helper.verifyToken(
      token.token,
      config.JWT_SECRET_KEY
    );
    expect(payloadGotten.payload).to.be.a("string").and.equal(payload);
  });

  it("should return true  when a string is compared with the right hash value", async () => {
    const isTrue = await Helper.comparePasswordHash(wrongText, rightHash);
    expect(isTrue).to.deep.eql(true);
  });

  it("should return false when a string is compared with the wrong hash value", async () => {
    const isTrue = await Helper.comparePasswordHash(wrongText, wrongHash);
    expect(isTrue).to.deep.eql(false);
  });

  it("should return the right amount of pages and limit", () => {
    const page = Helper.calcPages(8, 2);
    expect(page).to.equal(4);
  });

  it("should return datetime value", () => {
    const expiresIn = Helper.setTokenExpire(2);
    console.log(typeof expiresIn)
    expect(expiresIn).to.be.an('object');
  });
});
