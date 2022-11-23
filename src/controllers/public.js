import PublicService from "../services/public_service";

const { fetchMoviesByPage, fetchAllMovies, fetchMovieByTitle } = PublicService;

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

const fetchMovieTitle = async (req, res) => {
    console.log('Title loading')
    try {
        let movie = await fetchMovieByTitle(req.query)
        console.log('Blah', req.query)
        return res.status(200).json({
            message: `${req.query.title} returned`,
            data: movie
        })
    } catch (error) {
        console.log(error) //will use logger instead (testing now)
        return error
    }
}

export { fetchMovies, fetchMoviesPagination, fetchMovieTitle }