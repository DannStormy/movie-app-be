import { faker } from "@faker-js/faker";

export const superAdminLogin = {
  email: "cedric@gmail.com",
  password: "super",
};

export const createTestAdmin = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  role_id: 2,
};

export const testAdminLogin = {
  email: createTestAdmin.email,
  password: "John1",
};
