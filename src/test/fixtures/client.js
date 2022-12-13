import { faker } from "@faker-js/faker";

export const testClient = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Client1234",
};

export const firstNameAbsent = {
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Client1234",
};

export const lastNameAbsent = {
  firstName: faker.name.firstName(),
  email: faker.internet.email(),
  password: "Client1234",
};

export const emailAbsent = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: "Client1234",
};

export const passwordAbsent = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
};

export const clientLogin = {
  email: testClient.email,
  password: "Client1234",
};

export const missingClientEmail = {
  password: faker.lorem.words(10),
};

export const missingClientPassword = {
  email: faker.internet.email(),
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
