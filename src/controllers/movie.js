import MovieService from "../services/movie.service";

const { getMovies, getMovieByID, rateMovie } = MovieService;

const fetchMovies = async (req, res) => {
  try {
    // const {title, genre, year} = req.query
    // if (title || genre || year) {
    //   console.log('Here', req.query)
    //   const movies = await movie(req.query);
    //   return res.status(200).json({
    //     message: `movies returned`,
    //     data: movies,
    //   });
    // }
    // const movies = await fetchAllMovies(req.query);
    // return res.status(200).json({
    //   message: "movies fetched",
    //   data: movies,
    // });
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
  try {
    await rateMovie(req.body);
    return res.status(200).json({
      message: `movie rated`
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

export { fetchMovies, fetchMovieByID, updateMovieRating };
