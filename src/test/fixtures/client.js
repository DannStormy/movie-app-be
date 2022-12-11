import { faker } from '@faker-js/faker';

export const testClient = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Client1234",
};

export const clientLogin = {
    email: testClient.email,
    password: 'Client1234'
}