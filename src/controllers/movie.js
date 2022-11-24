import MovieService from "../services/movie.service";

const { fetchAllMovies, fetchMovieByQuery, fetchMovieByID } = MovieService;

const fetchMovies = async (req, res) => {
  try {
    const movies = await fetchAllMovies();
    return res.status(200).json({
      message: "movies fetched",
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

const searchMovies = async (req, res) => {
  try {
    let movies = await fetchMovieByQuery(req.query);
    return res.status(200).json({
      message: "movies fetched",
      data: movies,
    });
  } catch (error) {
    console.log(error); //will use logger instead (testing now)
    return error;
  }
};

// const fetchMoviesPagination = async (req, res) => {
//   try {
//     let movies = await fetchMoviesByPage(req.query);
//     console.log(req.query)
//     return res.status(200).json({
//       message: `Page ${req.query.page} fetched`,
//       data: movies
//     });
//   } catch (error) {
//     console.log(error); //will use logger instead (testing now)
//     return error;
//   }
// };

export {
  fetchMovies,
  searchMovies,
};