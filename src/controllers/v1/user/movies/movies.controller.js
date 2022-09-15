const directorDAO = require("./../../../../dao/v1/directors/director.dao");
const movieDAO = require("./../../../../dao/v1/movies/movies.dao");

exports.createMovie = async (req, res) => {
    try {
        const {name, release_year, director} = req.body;
        if (!name || !release_year || !director) {
            return res.status(400).json({message: 'Missing required fields', data: null});
        }
        const {success} = await directorDAO.getDirectorById(director);
        if (!success) {
            return res.status(400).json({
                message: 'Director does not exist',
                data: null
            });
        }
        const {code, data, message} = await movieDAO.createMovie(name, release_year, director);
        res.status(code).json({message, data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await movieDAO.getMovieById(id);
        res.status(response.code).json({message: response.message, data: response.data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await movieDAO.getMovieById(id);
        if (!response.success) {
            return res.status(404).json({message: response.message, data: null});
        }
        for (let key in req.body) {
            response.data[key] = req.body[key];
        }
        const {data, message, code} = await movieDAO.updateMovie(id, response.data);
        res.status(code).json({message, data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMovies = async (req, res) => {
    try {
        const response = await movieDAO.getMovies();
        res.status(response.code).json({message: response.message, data: response.data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
