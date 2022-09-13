const Director = require("./../../models/v1/director");

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
 * @property {Director} data - Newly created director information
 * */

/**
 * Creates a director in the database
 * @author Stanley Hayford <dev.stanley.hayford@gmail.com>
 * @param {string} first_name - first name of director
 * @param {string} last_name - last name of director
 * @returns {Response | null} Response from creating a director
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
