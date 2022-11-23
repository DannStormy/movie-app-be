import PublicService from "../services/public_service";

const { fetchMoviesByPage, fetchAllMovies } = PublicService;

const fetchMovies = async (req, res) => {
    try {
        let movies = await fetchAllMovies()
        return res.status(200).json({
            message: 'movies fetched',
            data: movies
        })
    } catch (error) {
        console.log(error) //will use logger instead (testing now)
        return error
    }
}

const fetchMoviesPagination = async (req, res) => {
    try {
        let movies = await fetchMoviesByPage(req.params)
        return res.status(200).json({
            message: `Page ${req.params.page} fetched`,
            data: movies
        })
    } catch (error) {
        console.log(error) //will use logger instead (testing now)
        return error
    }
}

export { fetchMovies, fetchMoviesPagination }