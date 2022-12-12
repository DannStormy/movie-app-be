import MovieService from "../services/movie.service";
import { Response, apiMessage } from "../utils/helpers/constants";

export const fetchMovies = async (req, res) => {
  try {
    const movies = await MovieService.getMovies(req.query);

    return Response.successResponse(res, {
      data: movies,
      message: apiMessage.RESOURCE_FETCH_SUCCESS("Movies"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const fetchMovieByID = async (req, res) => {
  try {
    const movie = await MovieService.getRatingsAndReviews(req.params.movieId);
    return Response.successResponse(res, {
      data: movie,
      message: apiMessage.RESOURCE_FETCH_SUCCESS("Movie"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const rateMovie = async (req, res) => {
  try {
    const {
      params: { movieId },
      data: { userId },
    } = req;
    await MovieService.rateMovie(movieId, userId, req.body);

    return Response.successResponse(res, {
      code: 200,
      message: apiMessage.RESOURCE_CREATE_SUCCESS("rating"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getUserMovieRatings = async (req, res) => {
  try {
    const {
      data: { userId },
    } = req;
    const rating = await MovieService.getMovieRating(userId);

    return Response.successResponse(res, {
      data: rating,
      message: apiMessage.RESOURCE_FETCH_SUCCESS("Rating and Review"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
export const addNewMovie = async (req, res) => {
  try {
    await MovieService.addMovie(req.body);

    return Response.successResponse(res, {
      code: 201,
      message: apiMessage.RESOURCE_CREATE_SUCCESS("movie"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await MovieService.removeMovie(req.params.movieId);

    return Response.successResponse(res, {
      message: apiMessage.RESOURCE_DELETE_SUCCESS("movie"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const editTitle = async (req, res) => {
  const {
    body: { title },
    params: { movieId },
  } = req;
  try {
    await MovieService.editTitle(title, movieId);

    return Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("Title"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const editRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const edited = await MovieService.editRating(
      rating,
      review,
      req.params.movieId,
      req.data.userId
    );

    return Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("Review"),
      data: edited,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
