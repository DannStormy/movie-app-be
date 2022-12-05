import MovieService from "../services/movie.service";
import { Response, apiMessage } from "../utils/helpers/constants";

export const fetchMovies = async (req, res) => {
  try {
    const movies = await MovieService.getMovies(req.query);
    Response.successResponse(res, {
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
    const movie = await MovieService.getMovieByID(req.params.movieId);
    Response.successResponse(res, {
      data: movie,
      message: apiMessage.RESOURCE_FETCH_SUCCESS("Movie"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const movieRating = async (req, res) => {
  try {
    const rating = await MovieService.getMovieRating(
      req.params.movieId,
      req.data.userId
    );
    if (rating) {
      return Response.errorResponse(req, res, {
        status: 409,
        message: apiMessage.RESOURCE_ALREADY_EXISTS("rating"),
      });
    }
    await MovieService.rateMovie(req.params.movieId, req.data.userId, req.body);
    Response.successResponse(res, {
      code: 201,
      message: apiMessage.RESOURCE_CREATE_SUCCESS("rating"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getMovieRating = async (req, res) => {
  try {
    const rating = await MovieService.getMovieRating(
      req.params.movieId,
      req.data.userId
    );
    Response.successResponse(res, {
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
    Response.successResponse(res, {
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
    const found = await MovieService.getMovieByID(req.params.movieId);
    if (!found.movie)
      return Response.errorResponse(req, res, {
        status: 404,
        message: apiMessage.RESOURCE_NOT_FOUND("movie"),
      });
    await MovieService.removeMovie(req.params.movieId);
    Response.successResponse(res, {
      message: apiMessage.RESOURCE_DELETE_SUCCESS("movie"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const titleEdit = async (req, res) => {
  const { title, movieId } = req.body;
  try {
    await MovieService.editTitle(title, movieId);
    Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("Title"),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const ratingEdit = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const edited = await MovieService.editRating(
      rating,
      review,
      req.params.movieId,
      req.data.userId
    );
    Response.successResponse(res, {
      message: apiMessage.RESOURCE_UPDATE_SUCCESS("Review"),
      data: edited,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
