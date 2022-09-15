const Movie = require("./../../../models/v1/movie");

/**
 * @typedef Movie
 * @type {object}
 * @property {string} name - Name of movie
 * @property {number} release_year - Year movie was released
 * @property {Director} director - Director of a movie
 * */

/**
 * @typedef Response
 * @type {object}
 * @property {number} code - Status code of response
 * @property {string} message - Message associated with response
 * @property {boolean} success - Whether operation was successful or not
 * @property {Movie | null | Array} - Data associated with response.
 * */


/**
 * Adds a new move to the database
 * @param {string} name - Name of movie
 * @param {number} release_year - Year movie was released
 * @director {string} director - ID of director who directed the move
 * @return {Response} response associated with creating a movie
 * */

exports.createMovie = async (name, release_year, director) => {
    try {
        const movie = await Movie.create({name, release_year, director});
        await movie.populate({path: 'director'});
        return {data: movie, success: true, code: 201, message: 'Movie created successfully'};
    }catch (e) {
        return {data: null, success: false, code: 500, message: e.message};
    }
}


/**
 * Retrieves a movie by ID
 * @param {string} id - ID of the movie to retrieve
 * @return {Response} - Response of retrieving operation
 * */

exports.getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id).populate({path: 'director'});
        if(!movie){
            return {data: null, success: false, code: 404, message: 'Movie not found'};
        }
        return {data: movie, success: true, code: 200, message: 'Movie retrieved successfully'};
    }catch (e) {
        return {data: null, success: false, code: 500, message: e.message};
    }
}


/**
 * Retrieves a movie by ID
 * @return {Response} - Response of retrieving operation
 * */

exports.getMovies = async () => {
    try {
        const movies = await Movie.find({}).populate({path: 'director'});
        return {data: movies, success: true, code: 200, message: `${movies.length} movies retrieved successfully`};
    }catch (e) {
        return {data: null, success: false, code: 500, message: e.message};
    }
}

exports.updateMovie = async (id, movie) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {new: true}).populate({path: 'director'});
        if(!updatedMovie){
            return {data: null, success: false, code: 400, message: 'Something went wrong'};
        }
        return {data: updatedMovie, success: true, code: 200, message: 'Movie updated successfully'};
    }catch (e) {
        return {data: null, success: false, code: 500, message: e.message};
    }
}
