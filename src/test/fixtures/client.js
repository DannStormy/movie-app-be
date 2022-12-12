import { faker } from "@faker-js/faker";

export const testClient = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Client1234",
};

export const clientLogin = {
  email: testClient.email,
  password: "Client1234",
};

export const incorrectClientLogin = {
  email: testClient.email,
  password: faker.lorem.words(10),
};

export const clientNewPassword = {
  password: faker.lorem.words(1),
};

export const incorrectforgotPasswordEmail = {
  email: faker.internet.email(),
};
