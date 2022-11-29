import MovieService from "../services/movie.service";

const {
  getMovies,
  getMovieByID,
  rateMovie,
  addMovie,
  removeMovie,
  reviewMovie,
  editRating,
  editReview,
  editTitle,
} = MovieService;

const fetchMovies = async (req, res) => {
  try {
    console.log("All queries", req.query);
    const movies = await getMovies(req.query);
    return res.status(200).json({
      message: `movies returned`,
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const fetchMovieByID = async (req, res) => {
  try {
    const movie = await getMovieByID(req.params);
    return res.status(200).json({
      message: `movie with id:${req.params.id} fetched`,
      data: movie,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const updateMovieRating = async (req, res) => {
  console.log("Here");
  try {
    await rateMovie(req.body);
    return res.status(200).json({
      message: `movie rated`,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const addNewMovie = async (req, res) => {
  try {
    await addMovie(req.body);
    return res.status(200).json({
      message: "movie added",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await getMovieByID(req.params);
    if (!movie)
      return res
        .status(400)
        .json({ message: `Movie with id:${req.params.id} not found` });
    await removeMovie(req.params);
    return res.status(200).json({
      message: `movie with id: ${req.params.id} removed`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const movieReview = async (req, res) => {
  try {
    await reviewMovie(req.body);
    return res.status(200).json({
      message: `reviewed submitted`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const titleEdit = async (req, res) => {
  try {
    await editTitle(req.body, req.params);
    return res.status(200).json({
      message: `title changed to ${req.body.title}`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const ratingEdit = async (req, res) => {
  try {
    await editRating(req.body, req.params);
    return res.status(200).json({
      message: `rating changed to ${req.body.rating}`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const reviewEdit = async (req, res) => {
  try {
    await editReview(req.body, req.params);
    return res.status(200).json({
      message: `Review edited`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  fetchMovies,
  fetchMovieByID,
  updateMovieRating,
  addNewMovie,
  deleteMovie,
  movieReview,
  ratingEdit,
  reviewEdit,
  titleEdit,
};
