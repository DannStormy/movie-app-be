import MovieService from "../services/movie.service";

export const fetchMovies = async (req, res) => {
  try {
    logger.info("All queries", req.query);
    const movies = await MovieService.getMovies(req.query);
    return res.status(200).json({
      message: "movies returned",
      data: movies,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const fetchMovieByID = async (req, res) => {
  try {
    const movie = await MovieService.getMovieByID(req.params);
    return res.status(200).json({
      message: `movie with id:${req.params.movieId} fetched`,
      data: movie
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const movieRating = async (req, res) => {
  try {
    await MovieService.rateMovie(req.body);
    return res.status(200).json({
      message: "movie rated",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const addNewMovie = async (req, res) => {
  try {
    await MovieService.addMovie(req.body);
    return res.status(200).json({
      message: "movie added",
      data: req.body,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieService.getMovieByID(req.params);
    if (!movie)
      return res
        .status(400)
        .json({ message: `Movie with id:${req.params.movieId} not found` });
    await MovieService.removeMovie(req.params);
    return res.status(200).json({
      message: `movie with id: ${req.params.movieId} removed`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const movieReview = async (req, res) => {
  try {
    await MovieService.reviewMovie(req.body);
    return res.status(200).json({
      message: "reviewed submitted",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const titleEdit = async (req, res) => {
  try {
    await MovieService.editTitle(req.body, req.params);
    return res.status(200).json({
      message: `title changed to ${req.body.title}`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const ratingEdit = async (req, res) => {
  try {
    await MovieService.editRating(req.body, req.params);
    return res.status(200).json({
      message: `rating changed to ${req.body.rating}`,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const reviewEdit = async (req, res) => {
  try {
    await MovieService.editReview(req.body, req.params);
    return res.status(200).json({
      message: "Review edited",
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const fetchReviewsById = async (req, res) => {
  try {
    const reviews = await MovieService.getReviewsById(req.params);
    return res.status(200).json({
      message: "Reviews fetched",
      data: reviews,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const fetchAllReviews = async (req, res) => {
  try {
    const reviews = await MovieService.getAllReviews();
    return res.status(200).json({
      message: "Reviews fetched",
      data: reviews,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
