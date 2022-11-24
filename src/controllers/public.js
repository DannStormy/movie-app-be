import PublicService from "../services/public_service";

const {
  fetchMoviesByPage,
  fetchAllMovies,
  fetchMovieByTitle,
  fetchMovieByRating,
  fetchMovieByGenre,
  fetchMovieByYear
} = PublicService;

const fetchMovies = async (req, res) => {
  try {
    let movies = await fetchAllMovies();
    return res.status(200).json({
      message: "movies fetched",
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const fetchMoviesPagination = async (req, res) => {
  try {
    let movies = await fetchMoviesByPage(req.params);
    return res.status(200).json({
      message: `Page ${req.params.page} fetched`,
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const fetchMovieTitle = async (req, res) => {
  try {
    let movie = await fetchMovieByTitle(req.query);
    return res.status(200).json({
      message: `movie found`,
      data: movie,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const fetchMovieRating = async (req, res) => {
  try {
    let movies = await fetchMovieByRating(req.params);
    return res.status(200).json({
      message: `movies returned`,
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const fetchMovieGenre = async (req, res) => {
  try {
    let movies = await fetchMovieByGenre(req.query);
    return res.status(200).json({
      message: `${req.query.genre} movies returned`,
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const fetchMovieYear = async (req, res) => {
  try {
    let movies = await fetchMovieByYear(req.params);
    return res.status(200).json({
      message: `${req.params.year} movies returned`,
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

export {
  fetchMovies,
  fetchMoviesPagination,
  fetchMovieTitle,
  fetchMovieRating,
  fetchMovieGenre,
  fetchMovieYear
};
