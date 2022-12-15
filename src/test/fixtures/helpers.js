import { faker } from "@faker-js/faker";
import Joi from "joi";
import ValidationHelper from "../../utils/validations/validations";

const { stringCheck, passwordCheck, emailCheck } = ValidationHelper;

export const originText = "hir35676";
export const wrongText = "894jdkf";
export const wrongHash = "zfGEvurXCYlD2IVVbfFUgewIb5ajGq8xcGwFrKxiDtP42wAmnQqK";
export const rightHash =
  "$2a$10$PiErUwApnwspPGRHs491m.nR9I9JZ20pvGnAW4uTTzkRd1ctqLCT.";
export const payload = "payload";
export const total = 8;
export const limit = 2;

export const testSchema = Joi.object({
  firstName: stringCheck("firstName"),
  lastName: stringCheck("lastName"),
  email: emailCheck(),
  password: passwordCheck(),
});

export const testObj = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Daniel1",
};

export const testError = {
  error: {
    message: faker.lorem.sentence(),
  },
  status: faker.lorem.word(),
};
