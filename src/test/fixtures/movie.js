import { faker } from "@faker-js/faker";

export const newMovie = {
  title: faker.lorem.words(2),
  genre: faker.lorem.words(3),
  year: 2006,
};

export const missingTitle = {
  genre: faker.lorem.words(3),
  year: 2006,
};

export const missingGenre = {
  title: faker.lorem.words(2),
  year: 2006,
};

export const missingYear = {
  title: faker.lorem.words(2),
  genre: faker.lorem.words(3),
};
export const rateMovie = {
  rating: 5.9,
  review: faker.lorem.words(20),
};

export const missingReview = {
  rating: 7.9,
};

export const missingRating = {
  review: faker.lorem.words(20),
};

export const movieTitle = {
  title: "Blood Revenge",
};
