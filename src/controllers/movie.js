import MovieService from "../services/movie.service";

const { fetchAllMovies, fetchMovieByQuery } = MovieService;

const fetchMovies = async (req, res) => {
  try {
    if (req.query.title || req.query.genre || req.query.year) {
      const movies = await fetchMovieByQuery(req.query);
      return res.status(200).json({
        message: "movies fetched by",
        data: movies,
      });
    }
    const movies = await fetchAllMovies(req.query);
    return res.status(200).json({
      message: "movies fetched",
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

export { fetchMovies };
