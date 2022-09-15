const Director = require("../../../models/v1/director");

/**
 * @typedef Director
 * @type {object}
 * @property {string} first_name - First name of director
 * @property {string} last_name - Last name of director
 * @property {string} _id - ObjectId of newly created director
 * @property {Date} createdAt - Date director was created
 * @property {Date} updatedAt - Date director was updated
 * */

/**
 * @typedef  Response
 * @type {object}
 * @property {number} code - Status code
 * @property {boolean} success - Whether the operation is successful or not
 * @property {string} message - Message associated with operation
 * @property {Director | null} data - Newly created director information
 * */

/**
 * Creates a director in the database
 * @author Stanley Hayford <dev.stanley.hayford@gmail.com>
 * @param {string} first_name - first name of director
 * @param {string} last_name - last name of director
 * @returns {Response} Response from creating a director
 * */
exports.createDirector = async (first_name, last_name) => {
    try {
        const director = await Director.create({first_name, last_name});
        if(!director){
            return {code: 400, success: false, data: null, message: 'Something went wrong'};
        }
        return {code: 201, success: true, data: director, message: 'Director created successfully'};
    }catch (e) {
        return {code: 400, success: false, data: null, message: e.message};
    }
}



/**
 * Creates a director in the database
 * @author Stanley Hayford <dev.stanley.hayford@gmail.com>
 * @param {string} id - id of director to find
 * @returns {Response} Response from finding director by id
 * */
exports.getDirectorById = async (id) => {
    try {
        const director = await Director.findById(id);
        if(!director){
            return {code: 404, success: false, data: null, message: 'Director not found'};
        }
        return {code: 200, success: true, data: director, message: 'Director retrieved successfully'};
    }catch (e) {
        return {code: 400, success: false, data: null, message: e.message};
    }
}


/**
 * Creates a director in the database
 * @author Stanley Hayford <dev.stanley.hayford@gmail.com>
 * @param {object} query - query to find a director from database
 * @returns {Response} Response from finding a director by query
 * */
exports.getDirector = async (query) => {
    try {
        const director = await Director.findOne(query);
        if(!director){
            return {code: 404, success: false, data: null, message: 'Director not found'};
        }
        return {code: 200, success: true, data: director, message: 'Director retrieved successfully'};
    }catch (e) {
        return {code: 400, success: false, data: null, message: e.message};
    }
}


/**
 * Creates a director in the database
 * @author Stanley Hayford <dev.stanley.hayford@gmail.com>
 * @param {string} id - id of the director to update
 * @param {object} director - An object containing new director information
 * @returns {Response} Response from updating director with specified id
 * */
exports.updateDirector = async (id, director) => {
    try {
        const updatedDirector = await Director.findByIdAndUpdate(id, director);
        if(!updatedDirector){
            return {code: 400, success: false, data: null, message: 'Something went wrong'};
        }
        return {code: 200, success: true, data: director, message: 'Director updated successfully'};
    }catch (e) {
        return {code: 400, success: false, data: null, message: e.message};
    }
}


/**
 * Creates a director in the database
 * @author Stanley Hayford <dev.stanley.hayford@gmail.com>
 * @returns {Response} Response from updating director with specified id
 * */
exports.getDirectors = async () => {
    try {
        const directors = await Director.find({});
        console.log('find directors')
        return {code: 200, success: true, data: directors, message: `${directors.length} Directors retrieved successfully`};
    }catch (e) {
        return {code: 400, success: false, data: null, message: e.message};
    }
}
